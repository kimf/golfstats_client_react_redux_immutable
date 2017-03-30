module.exports = {
  parser: "babel-eslint",
  plugins: [
    "react",
    "react-perf"
  ],
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-perf/recommended"
  ],
  env: {
    "browser": true
  },
  settings: {
    "ecmascript": 6,
    "import/resolver": {
      "babel-module": {}
    }
  },
  ecmaFeatures: {
    "jsx": true,
    "modules": true,
    "destructuring": true,
    "classes": true,
    "forOf": true,
    "blockBindings": true,
    "arrowFunctions": true
  },
  globals: {
    "__DEV__": true
  },
  rules: {
    "valid-jsdoc": 2,
    "no-var": 2,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/jsx-no-undef": 2,
    "react/jsx-wrap-multilines": 2,
    "react/jsx-filename-extension": 0,
    "comma-dangle": [
      2,
      "never"
    ],
    semi: [
      2,
      "never"
    ],
    "no-undef": 2,
    "no-unused-vars": 2,
    "global-require": 0
  }
}
