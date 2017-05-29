'use strict';

const path = require('path');
const webpack = require('webpack');
var tscompilerOptions = {
    compilerOptions: {
        "module": "commonjs"
    }
};

module.exports = {
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(css|html)$/,
                exclude: '/node_modules',
                use: {
                    loader: 'raw'
                }
            }, {
                test: /\.tsx?$/,
                exclude: '/node_modules',
                use: {
                    loader: 'ts-loader',
                    options: tscompilerOptions
                }
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: ['.js', '.ts', '.tsx']
    }
};