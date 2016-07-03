var loaders = require('./loaders');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StringReplacePlugin = require("string-replace-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: {
        app: './src/index.ts',
    },
    output: {
        filename: './bundle.js',
        path: 'dist',
        publicPath: '/'
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json']
    },
    debug: true,
    plugins: [
        new CopyWebpackPlugin([
            {from: 'node_modules/core-js/client/shim.min.js', to: 'node_modules/core-js/client/shim.min.js'},
            {from: 'node_modules/zone.js/dist/zone.js', to: 'node_modules/zone.js/dist/zone.js'},
            {from: 'node_modules/reflect-metadata/Reflect.js', to: 'node_modules/reflect-metadata/Reflect.js'}
        ]),
        new StringReplacePlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            hash: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        })
    ],
    module: {
        loaders: loaders
    }
};