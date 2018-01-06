const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require("./common");
const path = require('path');

module.exports = webpackMerge(commonConfig, {
    module: {
        rules: [
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
                    'postcss-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve("./dist"),
        compress: true,
        // hot: true,
        inline: true,
        port: process.env.WEBPACK_BUILD_PORT || 3000,
        historyApiFallback: true,
        https: true,
    }
});
