// @ts-check
import { createRequire } from 'node:module';

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const require = createRequire(import.meta.url);
const expoConfig = require('eslint-config-expo/flat');

const sharedRules = {
  '@typescript-eslint/no-unused-vars': [
    'error',
    { argsIgnorePattern: '^_', varsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
  ],
  '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
  'no-console': ['warn', { allow: ['warn', 'error'] }],
};

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.expo/**',
      'apps/app/expo-env.d.ts',
    ],
  },

  // Backend og delt kode: Node + TypeScript
  {
    files: ['apps/api/**/*.ts', 'packages/**/*.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: { globals: globals.node },
    rules: sharedRules,
  },

  // Expo-appen: Expos anbefalte regler (React, hooks, import)
  ...expoConfig.map((config) => ({ ...config, files: ['apps/app/**/*.{js,jsx,ts,tsx}'] })),
  {
    files: ['apps/app/**/*.{ts,tsx}'],
    rules: sharedRules,
    settings: {
      'import/resolver': {
        typescript: { project: 'apps/app/tsconfig.json' },
      },
    },
  },
  {
    // Konfigurasjonsfiler som Expo, Babel, Metro og Tailwind leser med require()
    files: ['apps/app/*.js', 'apps/app/test/**/*.js', 'apps/app/src/theme/*.js'],
    languageOptions: { globals: globals.node },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    files: ['apps/app/**/__tests__/**', 'apps/app/**/*.test.{ts,tsx}'],
    languageOptions: { globals: globals.jest },
  },
);
