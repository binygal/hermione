import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tslint from "typescript-eslint";
import styles from './eslint/style.linting.mjs';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});
const eslintConfig = [
  ...compat.config({
    extends: [
      "eslint:recommended",
      "next",
    ],
  }),
  ...tslint.configs.recommended,
  styles,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
export default eslintConfig;
