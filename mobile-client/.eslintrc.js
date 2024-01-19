module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended"
	],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint",
		"react"
	],
	"rules": {
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"no-unused-vars": ["off"],
		"@typescript-eslint/no-unused-vars": ["off"],
		"no-explicit-any": ["off"],
		"@typescript-eslint/no-explicit-any": ["off"],
		"no-var-requires": ["off"],
		"@typescript-eslint/no-var-requires": ["off"],
		"no-mixed-spaces-and-tabs": ["off"],
		"@typescript-eslint/no-mixed-spaces-and-tabs": ["off"],
		"no-unescaped-entities": ["off"],
		"@typescript-eslint/no-unescaped-entities": ["off"],
		"no-constant-condition": ["off"],
		"@typescript-eslint/no-constant-condition": ["off"],
	}
}
