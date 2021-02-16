module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-prototype-builtins': 'off',
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    radix: 'off',
    'prefer-destructuring': 'off',
    'no-mixed-operators': 'off',
    'vue/require-v-for-key': 'off',
    'import/extensions': 'off',
    'linebreak-style': ['off'],
    'object-shorthand': 'off',
    'import/no-cycle': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
