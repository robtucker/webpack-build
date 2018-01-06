const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require("./common");

module.exports = webpackMerge(commonConfig, {

});

