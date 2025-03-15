const fs = require("fs")
const path = require("path")
const { promisify } = require("util")
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

// Configuration file patterns to check
const CONFIG_PATTERNS = [
  { pattern: /^next\.config\.(ts|mjs)$/, correctFormat: "next.config.js" },
  { pattern: /^postcss\.config\.(ts|mjs)$/, correctFormat: "postcss.config.js" },
  { pattern: /^tailwind\.config\.(ts|mjs)$/, correctFormat: "tailwind.config.js" },
  { pattern: /^\.eslintrc\.(ts|mjs)$/, correctFormat: ".eslintrc.js" },
  { pattern: /^jest\.config\.(ts|mjs)$/, correctFormat: "jest.config.js" },
  { pattern: /^babel\.config\.(ts|mjs)$/, correctFormat: "babel.config.js" },
  { pattern: /^webpack\.config\.(ts|mjs)$/, correctFormat: "webpack.config.js" },
  { pattern: /^tsconfig\..*\.json$/, correctFormat: "tsconfig.json" },
  { pattern: /^\.prettierrc\.(ts|mjs)$/, correctFormat: ".prettierrc.js" },
]

// Directories to ignore
const IGNORE_DIRS = ["node_modules", ".git", ".next", "out", "build", "dist"]

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
      fileList.push(filePath)
    }
  }

  return fileList
}

async function checkConfigFiles() {
  console.log("Checking for configuration files in non-JavaScript format...")

  try {
    const files = await findFiles(process.cwd())
    let foundIssues = false

    for (const file of files) {
      const fileName = path.basename(file)

      for (const { pattern, correctFormat } of CONFIG_PATTERNS) {
        if (pattern.test(fileName)) {
          console.log(`\x1b[33mWarning:\x1b[0m Found configuration file in non-JavaScript format: ${file}`)
          console.log(`  Please convert to: ${correctFormat}`)
          foundIssues = true
        }
      }
    }

    if (!foundIssues) {
      console.log("\x1b[32mSuccess:\x1b[0m All configuration files are in JavaScript (.js) format!")
    } else {
      console.log("\nPlease convert the above files to JavaScript (.js) format for consistency and compatibility.")
      process.exit(1)
    }
  } catch (error) {
    console.error("Error checking configuration files:", error)
    process.exit(1)
  }
}

checkConfigFiles()

