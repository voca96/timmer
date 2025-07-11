import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		plugins: { js },
		extends: ['js/recommended'],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		languageOptions: { globals: globals.node },
	},
	{
		rules: {
			'react/react-in-jsx-scope': 1,
			'react/jsx-uses-react': 1,
		},
	},
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
]);
