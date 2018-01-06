
const path = require('path');
const webpack = require('webpack');
const handlebars = require('handlebars');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require('colors');

// load the dotenv configuration file before we do anything else
// https://github.com/motdotla/dotenv
// require('dotenv').config()
const envFile = `${path.resolve('.')}/.env`
const config = require('dotenv').config({ path: envFile });
const msg = `\nSetting variables for ${process.env.NODE_ENV} environment\n`.magenta
console.log(msg, config.parsed)


const entry = path.resolve("./src/index.ts")
const output = path.resolve("./dist")

module.exports = {
    entry: entry,
    output: {
        filename: "bundle.js",
        path: output,
        publicPath: '/',
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
                //loaders: ['react-hot', 'babel-loader'],
            },
            {
                test: /\.(ts|tsx)$/i,
                loader: "ts-loader"

            },
            {
                test: /\.md$/,
                loader: "raw-loader"
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            query: {
                                hash: 'sha512',
                                name: '[name].[ext]',
                                digest: 'hex',
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            query: {
                                mozjpeg: {
                                    progressive: true,
                                },
                                gifsicle: {
                                    interlaced: true,
                                },
                                optipng: {
                                    optimizationLevel: 7,
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./src/index.hbs'),
            cdns: [],
            metas: [
                {"charset": "utf-8"},
                {"name": "author"},
                {"http-equiv": "x-ua-compatible", "content": "ie=edge"},
                {"name": "viewport", "content": "width=device-width, initial-scale=1"}
            ],
            GA_ID: config.parsed.GA_ID || ''
        }),
        new webpack.DefinePlugin({
            "process.env": {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                "CONFIG": JSON.stringify(config.parsed)
            }
        }),
    ],
};

