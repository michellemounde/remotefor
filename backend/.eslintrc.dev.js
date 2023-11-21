module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
  },
  'extends': 'google',
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'ignorePatterns': ['/db/*', '/node_modules/*'],
  'rules': {
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', 115],
    'new-cap': ['error', { 'properties': false }],
    // from airbnb base
    // this option sets a specific tab width for your code
    // https://eslint.org/docs/rules/indent
    'indent': ['error', 2, {
      'SwitchCase': 1,
      'VariableDeclarator': 1,
      'outerIIFEBody': 1,
      // "MemberExpression": null,
      'FunctionDeclaration': {
        'parameters': 1,
        'body': 1,
      },
      'FunctionExpression': {
        'parameters': 1,
        'body': 1,
      },
      'CallExpression': {
        'arguments': 1,
      },
      'ArrayExpression': 1,
      'ObjectExpression': 1,
      'ImportDeclaration': 1,
      'flatTernaryExpressions': false,
      'ignoreComments': false,
    }],
  },
};
