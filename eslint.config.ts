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
      "@typescript-eslint": typescript_eslint.plugin
    },
    rules: {
      "arrow-body-style": "error", // Require braces around arrow function bodies.
      "comma-dangle": "error", // Require or disallow trailing commas.
      "default-case": "error", // Require default cases in switch statements.
      "func-style": ["error", "expression", { allowArrowFunctions: true }], // Enforce the consistent use of either function declarations or expressions assigned to variables.
      "no-duplicate-imports": "error", // Disallow duplicate module imports.
      "no-empty": "error", // Disallow empty block statements.
      "no-multi-spaces": "error", // Disallow multiple spaces.
      "no-multiple-empty-lines": ["error", { max: 1 }], // Disallow multiple empty lines.
      "no-trailing-spaces": "error", // Disallow trailing whitespace at the end of lines.
      "no-useless-catch": "error", // Disallow unnecessary catch clauses.
      "no-useless-constructor": "error", // Disallow unnecessary constructors.
      "no-useless-rename": "error", // Disallow renaming import, export, and destructured assignments to the same name.
      "no-useless-return": "error", // Disallow redundant return statements.
      "no-var": "error", // Require let or const instead of var.
      "object-shorthand": "error", // Require or disallow method and property shorthand syntax for object literals.
      "prefer-arrow-callback": "error", // Require using arrow functions for callbacks.
      "prefer-const": "error", // Require const declarations for variables that are never reassigned after declared.
      "prefer-template": "error", // Require template literals instead of string concatenation.
      "quote-props": ["error", "as-needed"], // Require quotes around object literal property names.
      eqeqeq: "error", // Require the use of === and !==.
      indent: ["error", 2], // Enforce consistent indentation.
      quotes: ["error", "double"], // Enforce the consistent use of either backticks, double, or single quote.

      "@typescript-eslint/consistent-type-definitions": ["error", "type"], // Enforce type definitions to consistently use either interface or type.
      "@typescript-eslint/consistent-type-exports": "error", // Enforce consistent usage of type exports.
      "@typescript-eslint/consistent-type-imports": "error", // Enforce consistent usage of type imports.
      "@typescript-eslint/explicit-function-return-type": "error", // Require explicit return types on functions and class methods.
      "@typescript-eslint/explicit-member-accessibility": "error", // Require explicit accessibility modifiers on class properties and methods.
      "@typescript-eslint/prefer-readonly": "error", // Require private members to be marked as readonly if they're never modified outside of the constructor.
      "@typescript-eslint/strict-boolean-expressions": "error", // Disallow certain types in boolean expressions.
      "@typescript-eslint/typedef": [
        // Require type annotations in certain places.
        "error",
        {
          arrayDestructuring: true, // Whether to enforce type annotations on variables declared using array destructuring.
          arrowParameter: true, // Whether to enforce type annotations for parameters of arrow functions.
          memberVariableDeclaration: true, // Whether to enforce type annotations on member variables of classes.
          objectDestructuring: true, // Whether to enforce type annotations on variables declared using object destructuring.
          parameter: true, // Whether to enforce type annotations for parameters of functions and methods.
          propertyDeclaration: true, // Whether to enforce type annotations for properties of interfaces and types.
          variableDeclaration: true, // Whether to enforce type annotations for variable declarations, excluding array and object destructuring.
          variableDeclarationIgnoreFunction: true // Whether to ignore variable declarations for non-arrow and arrow functions.
        }
      ]
    }
  }
];