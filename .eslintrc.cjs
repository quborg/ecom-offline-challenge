/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    // 'no-unused-vars': ["error", { "args": "none" }],
    // "no-trailing-whitespace": ["error", "always"],
    // "prefer-const": ["error", { "destructuring": "any" }],
    // "semicolon": ["error", "always"],
    // "space-before-function-paren": ["error", "never"],
    // "quotemark": ["error", "single"]
  }
};