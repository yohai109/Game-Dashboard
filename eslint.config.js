import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  // Ignore build and vendor folders
  { ignores: ["dist/", "node_modules/"] },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended (no type-checking to keep it fast)
  ...tseslint.configs.recommended,

  // React + hooks + a11y + import rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module"
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      prettier: prettierPlugin
    },
    settings: {
      react: { version: "detect" }
    },
    rules: {
      // React 17+ with automatic JSX runtime
      "react/react-in-jsx-scope": "off",
      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // Prettier formatting as lint rule
      "prettier/prettier": "warn"
    }
  },
  // Turn off conflicting formatting rules
  prettierConfig
];
