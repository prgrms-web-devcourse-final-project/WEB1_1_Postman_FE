import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import airbnbBase from 'eslint-config-airbnb-base';
import airbnbHooks from 'eslint-config-airbnb/hooks';
import react from 'eslint-plugin-react';

export default [
    {
        ignores: [
            'dist',
            '**/*stories*',
            '**/webpack*.js',
            '**/webpack/**/*.js',
            'src/stories/**',
            '.storybook',
            '.yarn',
            'vite.config.ts',
            'vite_cache',
            'src/stores/stories/**'
        ]
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parser: tsParser
        },
        plugins: {
            react: react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@typescript-eslint': tseslint
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...airbnbBase.rules,
            ...airbnbHooks.rules,
            ...react.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true }
            ],
            '@typescript-eslint/no-unused-expressions': [
                'error',
                {
                    allowShortCircuit: true,
                    allowTernary: true,
                    allowTaggedTemplates: true
                }
            ],
            'import/extensions': 'off',
            'import/no-extraneous-dependencies': 'off',
            'react/jsx-filename-extension': [
                1,
                { extensions: ['.jsx', '.tsx'] }
            ],
            'react/function-component-definition': [
                'error',
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function'
                }
            ]
        }
    }
];
