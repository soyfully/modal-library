const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    entry: './src/etribeModal.ts',
    output: {
        filename: 'etribeModal.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: '',
        libraryTarget: 'window',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/html/example.html',
            filename: 'index.html'
        }),
        // new webpack.ProvidePlugin({ // 제이쿼리 추가
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    // externals: {
    //     jquery: 'jQuery' // 배포 시 제이쿼리 삭제
    // }
}