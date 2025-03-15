module.exports = {
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  plugins: ["@typescript-eslint", "react"],
  rules: {
    // Prevent unescaped entities
    "react/no-unescaped-entities": ["error", { forbid: [">", '"', "}"] }],

    // Prevent unused variables
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],

    // Prevent any type
    "@typescript-eslint/no-explicit-any": "error",

    // Ensure exhaustive deps
    "react-hooks/exhaustive-deps": "warn",
  },
  parser: "@typescript-eslint/parser",
  // Add overrides for specific files if needed
  overrides: [
    {
      // Allow certain rules to be disabled in specific files
      files: ["**/data/*.ts", "**/types/*.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
}

