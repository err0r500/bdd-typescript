module.exports = {
    env: {
        "node": true
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
        "no-console": "off",
        "semi": ["error", "never"],
        "no-unexpected-multiline": 2
    }
}
