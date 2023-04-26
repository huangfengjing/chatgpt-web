module.exports = {
  root: true,
  extends: ['@antfu'],
  rules: {
    'indent': ['error', 2, { MemberExpression: 1, SwitchCase: 1 }],
    'no-tabs': 0,
  },
}
