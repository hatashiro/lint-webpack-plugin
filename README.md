# lint-webpack-plugin

[![npm](https://img.shields.io/npm/v/lint-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/lint-webpack-plugin)
[![Travis](https://img.shields.io/travis/utatti/lint-webpack-plugin.svg?style=flat-square)](https://travis-ci.org/utatti/lint-webpack-plugin)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A webpack plugin to run custom lint shell command

## What's this?

lint-webpack-plugin is a simple script to run custom lint commands.

If it's build (`webpack`), it will run the commands *before* the webpack build
starts. If there is any error occuring in the commands, the webpack process will
stop.

If it's watch (`webpack --watch`), it will run the commands *with* the webpack
build. Although there is any error, it will be ignored and the webpack process
will continue to work.

## Install

``` shell
npm i --save-dev lint-webpack-plugin
```

## How to use

An example `webpack.config.js` with TypeScript and Prettier:

``` js
const LintPlugin = require('lint-webpack-plugin');

module.exports = {
  ...

  plugins: [
    new LintPlugin([
      'tsc --noEmit',
      "prettier -l --parser=babylon \'src/**/*'"
    ])
  ]
};
```

Please note that the current `./node_modules/.bin` will be added to `PATH`, so
local package binaries can be used directly.

## Demo

### Build

![build](https://user-images.githubusercontent.com/1013641/39122566-4cbf05e2-4730-11e8-9fd6-90287da5eca2.png)

### Watch

![watch](https://user-images.githubusercontent.com/1013641/39122659-90d34ebe-4730-11e8-809a-dd6bf0a2eaac.png)

## Similar works

### [webpack-shell-plugin](https://github.com/1337programming/webpack-shell-plugin)

If you want to run shell commands at more specific timings, please use
webpack-shell-plugin.

## License

[MIT](LICENSE)
