module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"node": true,
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"overrides": [
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"linebreak-style": ["off"],
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"no-unused-vars": ["off"],
		"no-explicit-any": ["off"],
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
