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
        preLoaders: [
            { exclude: /node_modules/, loader: 'tslint', test: /\.tsx?$/ }
        ],
        loaders: [
            { exclude: /(node_modules|dist)/, include: path.resolve('src'), loader: 'raw', test: /\.(css|html)$/ },
            { exclude:  /(node_modules|dist)/, include: path.resolve('src'), loader: 'ts-loader?' + JSON.stringify(tscompilerOptions), test: /\.tsx?$/ }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.ts', '.tsx'],
        modulesDirectories: ['node_modules'],
        root: path.resolve('.', 'src')
    }
};