#!/usr/bin/env node

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("🚀 Updating ESLint and related packages...")

try {
  // Update ESLint and related packages with compatible versions
  execSync(
    "pnpm add -D eslint@8.56.0 @typescript-eslint/eslint-plugin@7.0.0 @typescript-eslint/parser@7.0.0 eslint-config-prettier@9.0.0 eslint-plugin-prettier@5.1.3",
    { stdio: "inherit" }
  )

  console.log("✅ ESLint packages updated successfully")

  // Run ESLint to check for any issues
  console.log("🔍 Running ESLint to check for issues...")
  try {
    execSync("pnpm lint", { stdio: "inherit" })
    console.log("✅ ESLint check passed")
  } catch (error) {
    console.log("⚠️ ESLint found some issues. You may need to fix them manually.")
  }

  // Run Prettier to format code
  console.log("🎨 Running Prettier to format code...")
  try {
    execSync("npx prettier --write .", { stdio: "inherit" })
    console.log("✅ Code formatted with Prettier")
  } catch (error) {
    console.log("⚠️ Prettier encountered some issues. You may need to fix them manually.")
  }

  console.log(`
🎉 ESLint update completed!

Next steps:
1. Review any ESLint or Prettier errors that were reported
2. Fix any issues in your code
3. Run 'pnpm lint' to verify that all issues are resolved
4. Commit your changes

If you encounter any issues with the updated ESLint configuration, you can revert to the previous version by running:
  pnpm add -D eslint@8.54.0 @typescript-eslint/eslint-plugin@8.26.1 @typescript-eslint/parser@8.26.1
  `)
} catch (error) {
  console.error("❌ Error updating ESLint:", error.message)
  process.exit(1)
}
