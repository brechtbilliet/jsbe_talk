var loaders = require('./loaders');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var StringReplacePlugin = require("string-replace-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        app: './src/index.ts',
        vendor: [
            '@angular/common',
            '@angular/compiler',
            '@angular/forms',
            '@angular/platform-browser',
            '@angular/core',
            '@angular/platform-browser-dynamic',
            '@ngrx/core',
            '@ngrx/store',
            '@ngrx/store-devtools',
            '@ngrx/store-log-monitor',
            'angular2-hmr',
            'lodash',
            'rxjs',
            'bootstrap/dist/css/bootstrap.css',
            'font-awesome/css/font-awesome.css'
        ]
    },
    output: {
        filename: './bundle.js',
        path: 'dev',
        publicPath: '/'
    },
    devServer: {
        hot: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json']
    },
    debug: true,
    devtool: 'cheap-module-eval-source-map',
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
        new OpenBrowserPlugin({url: 'http://localhost:8080'}),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ],
    module: {
        loaders: loaders
    }
};


//
//
// var loaders = require('./loaders');
// var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');
// var StringReplacePlugin = require("string-replace-webpack-plugin");
// var CopyWebpackPlugin = require("copy-webpack-plugin");
//
// module.exports = {
//     entry: {
//         app: './src/index.ts',
//         vendor: [
//             '@angular/common',
//             '@angular/compiler',
//             '@angular/forms',
//             '@angular/platform-browser',
//             '@angular/core',
//             '@angular/platform-browser-dynamic',
//             '@ngrx/core',
//             '@ngrx/store',
//             '@ngrx/store-devtools',
//             '@ngrx/store-log-monitor',
//             'angular2-hmr',
//             'lodash',
//             'rxjs',
//             'zone.js',
//             'bootstrap/dist/css/bootstrap.css',
//             'font-awesome/css/font-awesome.css'
//         ]
//     },
//     output: {
//         filename: './bundle.js',
//         path: 'dev',
//         publicPath: '/'
//     },
//     devServer: {
//         hot: true,
//         watchOptions: {
//             aggregateTimeout: 300,
//             poll: 1000
//         }
//     },
//     resolve: {
//         root: __dirname,
//         extensions: ['', '.ts', '.js', '.json']
//     },
//     debug: true,
//     devtool: 'cheap-module-eval-source-map',
//     plugins: [
//         new CopyWebpackPlugin([
//             {from: 'node_modules/core-js/client/shim.min.js', to: 'node_modules/core-js/client/shim.min.js'},
//             {from: 'node_modules/zone.js/dist/zone.js', to: 'node_modules/zone.js/dist/zone.js'},
//             {from: 'node_modules/reflect-metadata/Reflect.js', to: 'node_modules/reflect-metadata/Reflect.js'}
//         ]),
//         new StringReplacePlugin(),
//         new HtmlWebpackPlugin({
//             template: './src/index.html',
//             inject: 'body',
//             hash: true
//         }),
//         new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
//         new OpenBrowserPlugin({url: 'http://localhost:8080'})
//     ],
//     module: {
//         loaders: loaders
//     }
// };