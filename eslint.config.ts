import typescript_eslint from "typescript-eslint";

export default [
  { ignores: ["./dist/**"] },
  ...typescript_eslint.configs.strict,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescript_eslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module"
      }
    },
    plugins: {
      "typescript-eslint": typescript_eslint.plugin
    },
    rules: {
      "arrow-body-style": "error",
      "comma-dangle": ["error", "never"],
      "default-case": "error",
      "func-style": ["error", "expression", { allowArrowFunctions: true }],
      "no-duplicate-imports": "error",
      "no-empty": "error",
      "no-multi-spaces": "error",
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-trailing-spaces": "error",
      "no-useless-catch": "error",
      "no-useless-constructor": "error",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": ["error", { allowNamedFunctions: false }],
      "prefer-const": "error",
      "prefer-template": "error",
      "quote-props": ["error", "as-needed"],
      eqeqeq: "error",
      indent: ["error", 2],
      quotes: ["error", "double", { avoidEscape: false }],

      "typescript-eslint/consistent-type-definitions": ["error", "type"],
      "typescript-eslint/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: true }],
      "typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "typescript-eslint/explicit-function-return-type": "error",
      "typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "explicit" }],
      "typescript-eslint/prefer-readonly": "error",
      "typescript-eslint/typedef": [
        "error",
        {
          arrayDestructuring: true,
          arrowParameter: true,
          memberVariableDeclaration: true,
          objectDestructuring: true,
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: true,
          variableDeclarationIgnoreFunction: true
        }
      ]
    }
  }
];
