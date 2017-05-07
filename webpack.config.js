// webpack.config.js file
const path = require('path');
const webpack = require('webpack');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const OUTPUT_PATH = './public'

module.exports = {
    entry: [
        './src/app.js'
    ], output: {
        path: path.resolve(__dirname, OUTPUT_PATH),
        filename: './js/bundle.js',
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        configFile: './.eslintrc.json'
                    }
                }, {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['es2015', {modules: false}],
                            'stage-0',
                            'react'],
                        plugins: [
                            "transform-flow-comments"
                        ],
                        comments: false,
                        compact: true
                    }
                }]
            },
        ],
    },

    plugins: [
        new FlowBabelWebpackPlugin(),
    ],
}