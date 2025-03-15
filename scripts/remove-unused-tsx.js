const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

// Configuration
const rootDir = process.cwd()
const fileExtensionsToScan = [".js", ".jsx", ".ts", ".tsx", ".md", ".mdx"]
const excludeDirs = ["node_modules", ".git", ".next", "out", "build", "dist"]

// Results storage
const allTsxFiles = new Set()
const referencedFiles = new Set()
const unusedFiles = new Set()
const removedFiles = []

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

  // Look for import statements
  const importRegex =
    /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+[^,]+|[^,{}]+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+[^,]+|[^,{}]+))*\s+from\s+)?['"]([^'"]+)['"]/g
  let match

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1]

    // Handle relative imports
    if (importPath.startsWith(".")) {
      const dirName = path.dirname(filePath)
      const resolvedPath = path.resolve(dirName, importPath)

      // Try different extensions if no extension in import
      if (!path.extname(resolvedPath)) {
        for (const ext of [".tsx", ".ts", ".jsx", ".js"]) {
          const pathWithExt = `${resolvedPath}${ext}`
          if (fs.existsSync(pathWithExt)) {
            referencedFiles.add(pathWithExt)
            break
          }

          // Check for index files
          const indexPath = path.join(resolvedPath, `index${ext}`)
          if (fs.existsSync(indexPath)) {
            referencedFiles.add(indexPath)
            break
          }
        }
      } else if (fs.existsSync(resolvedPath)) {
        referencedFiles.add(resolvedPath)
      }
    }
  }

  // Look for component usage (simplified, may need enhancement)
  const componentRegex = /<([A-Z][A-Za-z0-9]*)/g
  while ((match = componentRegex.exec(content)) !== null) {
    const componentName = match[1]

    // Search for files that export this component
    allTsxFiles.forEach((tsxFile) => {
      if (path.basename(tsxFile, ".tsx") === componentName) {
        referencedFiles.add(tsxFile)
      }
    })
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
    } else {
      scanFileForReferences(fullPath)
    }
  }
}

// Find unused .tsx files
const findUnusedTsxFiles = () => {
  allTsxFiles.forEach((file) => {
    if (!referencedFiles.has(file)) {
      // Special case: Check if it's a page or layout file in the app directory
      if (
        file.includes("/app/") &&
        (file.endsWith("/page.tsx") ||
          file.endsWith("/layout.tsx") ||
          file.endsWith("/loading.tsx") ||
          file.endsWith("/error.tsx"))
      ) {
        console.log(`Keeping Next.js app file: ${file}`)
        return
      }

      // Special case: Check if it's a page file in the pages directory
      if (file.includes("/pages/")) {
        console.log(`Keeping Next.js pages file: ${file}`)
        return
      }

      unusedFiles.add(file)
    }
  })
}

// Remove unused files
const removeUnusedFiles = () => {
  unusedFiles.forEach((file) => {
    try {
      // Backup the file before removing
      const backupDir = path.join(rootDir, "unused-tsx-backup")
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true })
      }

      const relativePath = path.relative(rootDir, file)
      const backupPath = path.join(backupDir, relativePath)

      // Create directory structure for backup
      const backupFileDir = path.dirname(backupPath)
      if (!fs.existsSync(backupFileDir)) {
        fs.mkdirSync(backupFileDir, { recursive: true })
      }

      // Copy file to backup
      fs.copyFileSync(file, backupPath)

      // Remove the file
      fs.unlinkSync(file)

      removedFiles.push({
        path: relativePath,
        backupPath: path.relative(rootDir, backupPath),
      })

      console.log(`Removed unused file: ${relativePath}`)
    } catch (error) {
      console.error(`Error removing file ${file}:`, error)
    }
  })
}

// Generate report
const generateReport = () => {
  const reportPath = path.join(rootDir, "unused-tsx-report.md")

  let report = `# Unused TSX Files Report\n\n`
  report += `Generated on: ${new Date().toLocaleString()}\n\n`
  report += `## Summary\n\n`
  report += `- Total TSX files: ${allTsxFiles.size}\n`
  report += `- Referenced TSX files: ${referencedFiles.size}\n`
  report += `- Unused TSX files: ${unusedFiles.size}\n`
  report += `- Removed files: ${removedFiles.length}\n\n`

  if (removedFiles.length > 0) {
    report += `## Removed Files\n\n`
    removedFiles.forEach((file) => {
      report += `- \`${file.path}\` (Backup: \`${file.backupPath}\`)\n`
    })
    report += `\n`
  }

  report += `## Potential Impact\n\n`
  report += `The removed files were not directly imported or referenced in the codebase. However, please be aware of the following potential impacts:\n\n`
  report += `1. Files might be dynamically imported using variable paths, which this analysis cannot detect.\n`
  report += `2. Components might be referenced using string literals or in ways not detected by the analysis.\n`
  report += `3. Some files might be entry points for specific build configurations.\n\n`
  report += `If you encounter any issues after removing these files, you can restore them from the backup directory: \`unused-tsx-backup\`.\n`

  fs.writeFileSync(reportPath, report)
  console.log(`Report generated at: ${reportPath}`)

  return report
}

// Main execution
console.log("Starting analysis of unused TSX files...")
findAllTsxFiles(rootDir)
console.log(`Found ${allTsxFiles.size} TSX files in the project.`)

scanAllFilesForReferences(rootDir)
console.log(`Found ${referencedFiles.size} referenced files.`)

findUnusedTsxFiles()
console.log(`Found ${unusedFiles.size} unused TSX files.`)

if (unusedFiles.size > 0) {
  removeUnusedFiles()
  console.log(`Removed ${removedFiles.length} unused TSX files.`)
}

const report = generateReport()
console.log("Analysis complete!")

// Return the report for display
return report;

