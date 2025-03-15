const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

try {
  console.log("Running analysis of unused TSX files...")
  execSync("node scripts/analyze-unused-tsx.js", { stdio: "inherit" })

  // Read the generated report
  const reportPath = path.join(process.cwd(), "unused-tsx-analysis.md")
  if (fs.existsSync(reportPath)) {
    const report = fs.readFileSync(reportPath, "utf8")
    console.log("\nAnalysis Report:")
    console.log(report)
  }
} catch (error) {
  console.error("Error running analysis:", error)
}

