'use strict';

const path = require('path');
const webpack = require('webpack');
const ngtools = require('@ngtools/webpack');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
    entry: {
        app: [path.resolve(rootDir, 'src', 'index')]
    },
    module: {
        loaders: [
            { exclude: '/node_modules', loader: 'raw', test: /\.(css|html)$/ },
            { exclude: '/node_modules', loader: ['@ngtools/webpack'], test: /\.tsx?$/ }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(rootDir, 'dist')
    },
    plugins: [
        // new webpack.LoaderOptionsPlugin({
        //     test: /\.ts$/,
        //     options: {
        //         resolve: {}
        //     }
        // }),
        // new webpack.NoErrorsPlugin(),
        // new webpack.optimize.OccurrenceOrderPlugin(true),
        new ngtools.AotPlugin({
            tsConfigPath: './tsconfig.json',
            baseDir: path.resolve(__dirname, '.'),
            genDir: path.resolve(__dirname, './src/ngfactory')
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    }
};