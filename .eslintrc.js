module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        // "plugin:react/recommended",
        "airbnb"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-console": 0,
        "no-empty": 0,
        "no-irregular-whitespace": 0,
        "react/prop-types": 0,
        "indent": 0,
        "linebreak-style": 0,
        "react/jsx-fragments": 0,
        "react/jsx-indent": 0,
        "react/jsx-indent-props": 0,
        "react/jsx-one-expression-per-line": 0,
        "react/jsx-max-props-per-line": 0,
        "react/jsx-props-no-spreading": 0,
        "react/no-unescaped-entities": 0,
        "react/destructuring-assignment": 0,
        "arrow-parens": 0,
        "spaced-comment": 0,
        "comma-dangle": 0,
        "max-len": 0,
        "no-plusplus": 0,
        "jsx-a11y/label-has-associated-control": 0
    }
};
