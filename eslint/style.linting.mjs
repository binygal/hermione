import stylistic from "@stylistic/eslint-plugin";

/**
 * @type {import('eslint').Linter.Config}
 */
const stylesConfig = {
  ...stylistic.configs.recommended,
  rules: {
    "@stylistic/semi": "error",
    "@stylistic/object-curly-spacing": ["error", "always"],
    "@stylistic/indent": ["error", 2],
    "@stylistic/max-len": ["error", { code: 120 }],
  },
};

export default stylesConfig;
