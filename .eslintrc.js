module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
      project: 'tsconfig.json', sourceType: 'module', ecmaVersion: 2020,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier', 'unicorn', 'import'],
  extends: ['eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:unicorn/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:@bringoo/bringoo-code-style/nest-rules'
  ],
  root: true,
  env: {
      es6: true, node: true, jest: true,
  },
  settings: {
      'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
      }, 'import/resolver': 'node', 'node': {
          'tryExtensions': ['.js', '.json', '.node', '.ts', '.d.ts'],
      },
  },
  rules: {
      '@typescript-eslint/naming-convention': ['error', {
          'selector': ['enumMember'], 'format': ['camelCase'],
      }],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-empty-function': ['error', {allow: ['methods']}],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-loop-func': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': true}],
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/typedef': [
          'error',
          {
              'arrowParameter': true,
              'variableDeclaration': true,
              'propertyDeclaration': true,
              'parameter': true
          }
      ],
      'class-methods-use-this': 'off',
      'complexity': ['error', 10],
      'dot-location': ['error', 'property'],
      'dot-notation': 'off',
      'eqeqeq': ['error', 'always'],
      'implicit-arrow-linebreak': 'off',
      'import/order': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-reduce': 'off',
      'no-dupe-class-members': 'error',
      'key-spacing': ['error', {'mode': 'strict'}],
      'linebreak-style': 'off',
      'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true}],
      'max-len': ['error', {code: 150, ignorePattern: '^import\\s.+\\sfrom\\s.+;$'}],
      'no-console': 'error',
      'no-extra-semi': 'error',
      'no-loop-func': 'off',
      'no-multi-spaces': ['error', {exceptions: {'ImportDeclaration': true}}],
      'no-trailing-spaces': ['error', {'skipBlankLines': true}],
      'no-whitespace-before-property': 'error',
      'prefer-template': 'error',
      'no-multiple-empty-lines': ['error', {'max': 2, 'maxEOF': 1}],
      'no-redeclare': ['error', {'builtinGlobals': true}],
      'no-shadow': 'off',
      'no-unused-vars': 'off',
      'no-useless-constructor': 'off',
      'padding-line-between-statements': ['error'],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-imports': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/import-style': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'array-element-newline': ['error', {
          'ArrayExpression': 'consistent', 'ArrayPattern': {'minItems': 6},
      }],
      'prettier/prettier': 'error',
      'import/no-unresolved': 'off',
      'import/no-named-as-default': 'off',
      'import/no-cycle': 'off',
      'import/namespace': 'off',
  },
};
