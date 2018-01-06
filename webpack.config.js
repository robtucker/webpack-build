const path = require('path');
const build = require('./lib');
const webpackMerge = require('webpack-merge');

const config = {}

module.exports = webpackMerge(build.getConfig(), config)

