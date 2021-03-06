'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['jquery', 'backbone', 'underscore', 'chart.js', 'ab-result'],
        app: './src/js/app.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        modules: [
            path.resolve(__dirname + '/src'),
            path.resolve(__dirname + '/node_modules')
        ],
        alias: {
            jquery: "jquery/src/jquery",
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,
        }),
    ],
    target: 'web',
    devtool: 'source-map',
};
