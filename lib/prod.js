const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require("./common");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');

const extractSASS = new ExtractTextPlugin('/[name].css');
const output = path.resolve("./dist")

module.exports = webpackMerge(commonConfig, {
    output: {
        path: output,
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    externals: {
        // Use external version of React
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: extractSASS.extract([
                    'css-loader?modules&localIdentName=[hash:base64:5]',
                    'postcss-loader',
                    'sass-loader',
                ])
            }
        ],
    },
    plugins: [
        extractSASS,
        new UglifyJsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.[chunkhash].js',
            minChunks(module) {
                return module.context &&
                    module.context.indexOf('node_modules') >= 0;
            }
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
            threshold: 10240,
            minRatio: 0.8
        })

    ]
});

