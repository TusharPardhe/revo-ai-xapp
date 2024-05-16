module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', '.prettierrc'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'react'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.vue', '.ts', '.d.ts'],
            },
            alias: {
                extensions: ['.vue', '.js', '.ts', '.scss', '.d.ts'],
                map: [
                    ['@/components', './src/components'],
                    ['@/pages', './src/pages'],
                    ['@/assets', './src/assets'],
                    ['@/config', './src/config'],
                    ['@/store', './src/store'],
                    ['@/app-types', './src/types'],
                    ['@/hooks', './src/hooks'],
                    ['@/utils', './src/utils'],
                ],
            },
        },
    },
};
