const fs = require("fs")
const path = require("path")

// Configuration
const rootDir = process.cwd()
const fileExtensionsToScan = [".js", ".jsx", ".ts", ".tsx", ".md", ".mdx"]
const excludeDirs = ["node_modules", ".git", ".next", "out", "build", "dist"]

// Results storage
const allTsxFiles = new Set()
const referencedFiles = new Set()
const unusedFiles = new Set()

// Helper function to check if a path should be excluded
const shouldExcludePath = (pathToCheck) => {
  return excludeDirs.some((dir) => pathToCheck.includes(`/${dir}/`))
}

// Find all .tsx files in the project
const findAllTsxFiles = (dir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    const fullPath = path.join(dir, file.name)

    if (shouldExcludePath(fullPath)) continue

    if (file.isDirectory()) {
      findAllTsxFiles(fullPath)
    } else if (file.name.endsWith(".tsx")) {
      allTsxFiles.add(fullPath)
    }
  }
}

// Scan a file for references to other files
const scanFileForReferences = (filePath) => {
  if (!fs.existsSync(filePath)) return

  const content = fs.readFileSync(filePath, "utf8")
  const fileExtension = path.extname(filePath)

  if (!fileExtensionsToScan.includes(fileExtension)) return

  // Enhanced import detection
  const patterns = [
    // Standard imports
    /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+[^,]+|[^,{}]+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+[^,]+|[^,{}]+))*\s+from\s+)?['"]([^'"]+)['"]/g,
    // Dynamic imports
    /import\(['"]([^'"]+)['"]\)/g,
    // Require statements
    /require\(['"]([^'"]+)['"]\)/g,
  ]

  patterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(content)) !== null) {
      const importPath = match[1]
      resolveAndAddReference(importPath, filePath)
    }
  })

  // Enhanced component usage detection
  const componentRegex = /<([A-Z][A-Za-z0-9]*)/g
  const jsxImportRegex = /import\s+{?\s*([A-Z][A-Za-z0-9]*)\s*}?\s+from/g
  
  // Track component names from imports
  const importedComponents = new Set()
  let jsxMatch
  while ((jsxMatch = jsxImportRegex.exec(content)) !== null) {
    importedComponents.add(jsxMatch[1])
  }

  // Check component usage
  while ((match = componentRegex.exec(content)) !== null) {
    const componentName = match[1]
    if (importedComponents.has(componentName)) {
      // Only look for files if the component was actually imported
      allTsxFiles.forEach((tsxFile) => {
        const baseName = path.basename(tsxFile, ".tsx")
        if (baseName === componentName || baseName === `${componentName}.index`) {
          referencedFiles.add(tsxFile)
        }
      })
    }
  }
}

// Helper function to resolve and add file references
const resolveAndAddReference = (importPath, sourceFile) => {
  if (importPath.startsWith(".")) {
    const dirName = path.dirname(sourceFile)
    let resolvedPath = path.resolve(dirName, importPath)

    // Try different extensions and index files
    const extensions = [".tsx", ".ts", ".jsx", ".js"]
    let found = false

    // First try with the exact path
    if (fs.existsSync(resolvedPath)) {
      referencedFiles.add(resolvedPath)
      found = true
    }

    // Try with extensions
    if (!found) {
      for (const ext of extensions) {
        const pathWithExt = `${resolvedPath}${ext}`
        if (fs.existsSync(pathWithExt)) {
          referencedFiles.add(pathWithExt)
          found = true
          break
        }

        // Check for index files
        const indexPath = path.join(resolvedPath, `index${ext}`)
        if (fs.existsSync(indexPath)) {
          referencedFiles.add(indexPath)
          found = true
          break
        }
      }
    }
  }
}

// Scan all files for references
const scanAllFilesForReferences = (dir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    const fullPath = path.join(dir, file.name)

    if (shouldExcludePath(fullPath)) continue

    if (file.isDirectory()) {
      scanAllFilesForReferences(fullPath)
    } else if (fileExtensionsToScan.includes(path.extname(file.name))) {
      scanFileForReferences(fullPath)
    }
  }
}

// Find unused .tsx files
const findUnusedTsxFiles = () => {
  const specialPaths = [
    "/app/",
    "/pages/",
    "/components/",
    "layout.tsx",
    "page.tsx",
    "loading.tsx",
    "error.tsx",
    "not-found.tsx",
    "template.tsx",
  ]

  allTsxFiles.forEach((file) => {
    const isSpecialFile = specialPaths.some(path => file.includes(path))
    
    if (!referencedFiles.has(file) && !isSpecialFile) {
      unusedFiles.add(file)
    }
  })
}

// Generate report
const generateReport = () => {
  let report = `# Unused TSX Files Analysis\n\n`
  report += `Generated on: ${new Date().toLocaleString()}\n\n`
  report += `## Summary\n\n`
  report += `- Total TSX files: ${allTsxFiles.size}\n`
  report += `- Referenced TSX files: ${referencedFiles.size}\n`
  report += `- Potentially unused TSX files: ${unusedFiles.size}\n\n`

  if (unusedFiles.size > 0) {
    report += `## Potentially Unused Files\n\n`

    const filesByDir = {}
    unusedFiles.forEach((file) => {
      const relativePath = path.relative(rootDir, file)
      const dir = path.dirname(relativePath)
      if (!filesByDir[dir]) filesByDir[dir] = []
      filesByDir[dir].push(path.basename(file))
    })

    Object.keys(filesByDir).sort().forEach((dir) => {
      report += `### ${dir}/\n\n`
      filesByDir[dir].sort().forEach((file) => {
        report += `- \`${file}\`\n`
      })
      report += `\n`
    })
  }

  report += `## Important Notes\n\n`
  report += `1. This analysis may have false positives for:\n`
  report += `   - Components loaded dynamically using string templates\n`
  report += `   - Files referenced through non-standard imports\n`
  report += `   - Components used in MDX files\n`
  report += `2. Please verify each file manually before removal\n`
  report += `3. Use \`remove-unused-tsx.js\` to safely remove files with backup\n`

  return report
}

// Main execution
console.log("Starting analysis of unused TSX files...")
findAllTsxFiles(rootDir)
console.log(`Found ${allTsxFiles.size} TSX files in the project.`)

scanAllFilesForReferences(rootDir)
console.log(`Found ${referencedFiles.size} referenced files.`)

findUnusedTsxFiles()
console.log(`Found ${unusedFiles.size} potentially unused TSX files.`)

const report = generateReport()
fs.writeFileSync(path.join(rootDir, "unused-tsx-analysis.md"), report)
console.log(`Report generated at: ${path.join(rootDir, "unused-tsx-analysis.md")}`)

return report

