const { defaults } = require('jest-config');

module.exports = {
	moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    'js',
    'json',
    'vue'
  ],
	transform: {
		".*\\.(vue)$": "@vue/vue3-jest",
		".*\\.(js)$": "babel-jest"
	},
  testEnvironment: "jsdom",
	testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/(*.)+(spec|test).[jt]s?(x)" ]
}
