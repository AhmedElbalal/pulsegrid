module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  settings: { react: { version: "detect" } },
  env: { node: true, browser: true, es2022: true, jest: true },
  ignorePatterns: ["**/dist/**", "**/node_modules/**"]
};
