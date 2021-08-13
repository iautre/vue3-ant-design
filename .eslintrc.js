module.exports = {
    'root': false,
    'env': {
      'node': true
    },
    'extends': [
      'plugin:vue/essential',
      '@vue/standard'
    ],
    'rules': {
      'no-consloe': process.env.NODE_ENV === 'production' ? 'off' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'warn',
      'indent': 'off'
    },
    'parserOptions': {
      'parser': 'babel-eslint'
    }
}