module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-essential"
    ],
    parserOptions: {
        ecmaVersion: "latest"
    },
    plugins: [
        "vue"
    ],
    rules: {
    }
};
