const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")
const { promisify } = require("util")
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
const readFile = promisify(fs.readFile)

// Directories to ignore
const IGNORE_DIRS = ["node_modules", ".git", ".next", "out", "build", "dist"]

// File extensions to scan
const FILE_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"]

async function findFiles(dir, fileList = []) {
  const files = await readdir(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stats = await stat(filePath)

    if (stats.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        fileList = await findFiles(filePath, fileList)
      }
    } else {
      const ext = path.extname(file)
      if (FILE_EXTENSIONS.includes(ext)) {
        fileList.push(filePath)
      }
    }
  }

  return fileList
}

async function extractImports(filePath) {
  const content = await readFile(filePath, "utf8")
  const imports = []

  // Match ES6 imports
  const es6ImportRegex = /import\s+(?:(?:[\w*\s{},]*)\s+from\s+)?['"]([^'"]+)['"]/g
  let match
  while ((match = es6ImportRegex.exec(content)) !== null) {
    imports.push(match[1])
  }

  // Match require statements
  const requireRegex = /require\s*$$\s*['"]([^'"]+)['"]\s*$$/g
  while ((match = requireRegex.exec(content)) !== null) {
    imports.push(match[1])
  }

  return imports
}

function isNodeModule(importPath) {
  // Check if the import is a node module (not a relative or absolute path)
  return !importPath.startsWith(".") && !importPath.startsWith("/")
}

function getPackageName(importPath) {
  // Extract the package name from the import path
  // e.g., '@radix-ui/react-dialog' -> '@radix-ui/react-dialog'
  // e.g., 'react-icons/fa' -> 'react-icons'
  const parts = importPath.split("/")

  if (importPath.startsWith("@")) {
    // Scoped package
    return `${parts[0]}/${parts[1]}`
  }

  return parts[0]
}

async function updateDependencies() {
  console.log("Scanning project files for dependencies...")

  try {
    // Read package.json
    const packageJsonPath = path.join(process.cwd(), "package.json")
    const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"))

    // Get current dependencies
    const currentDependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    }

    // Find all project files
    const files = await findFiles(process.cwd())

    // Extract imports from all files
    let allImports = []
    for (const file of files) {
      const imports = await extractImports(file)
      allImports = [...allImports, ...imports]
    }

    // Filter to only node modules and get unique package names
    const nodeModules = allImports
      .filter(isNodeModule)
      .map(getPackageName)
      .filter((pkg) => !pkg.startsWith("#")) // Filter out internal aliases
      .filter((pkg, index, self) => self.indexOf(pkg) === index) // Get unique values

    // Find missing dependencies
    const missingDependencies = nodeModules.filter((pkg) => !currentDependencies[pkg])

    if (missingDependencies.length === 0) {
      console.log("\x1b[32mSuccess:\x1b[0m All dependencies are already in package.json!")
      return
    }

    console.log(`Found ${missingDependencies.length} missing dependencies:`)
    missingDependencies.forEach((pkg) => console.log(`- ${pkg}`))

    // Install missing dependencies
    console.log("\nInstalling missing dependencies...")
    try {
      execSync(`npm install ${missingDependencies.join(" ")}`, { stdio: "inherit" })
      console.log("\x1b[32mSuccess:\x1b[0m Dependencies installed and package.json updated!")
    } catch (error) {
      console.error("\x1b[31mError:\x1b[0m Failed to install dependencies:", error.message)
    }
  } catch (error) {
    console.error("Error updating dependencies:", error)
    process.exit(1)
  }
}

updateDependencies()

