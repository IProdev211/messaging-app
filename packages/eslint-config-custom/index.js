module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
	},
	plugins: ['@typescript-eslint'],
	env: {
		node: true,
	},
	rules: {
		'@typescript-eslint/no-non-null-assertion': 'off',
	},
};
