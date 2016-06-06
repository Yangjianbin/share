var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
module.exports = {
    //插件项
    plugins: [commonsPlugin, new ExtractTextPlugin("[name].css")],
    //页面入口文件配置
    entry:  {detail:'./app/detail',surplus:'./app/surplus',comty:'./app/comty'},
    //入口文件输出配置
    output: {
        path: path.join(__dirname, './dest'),
        filename: '[name].js',
        publicPath: '/dest/'
    },
    module: {
        //加载器配置
        loaders: [{
            test: /\.css$/,
            loader : ExtractTextPlugin.extract('style-loader','css-loader')
        }, {
            test: /\.js$/,
            loader: 'jsx-loader?harmony'
        }, {
            test: /\.scss$/,
            // loader: 'style!css!sass?sourceMap'
            loader : ExtractTextPlugin.extract('style-loader','css!sass?sourceMap')
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    //其它解决方案配置
    resolve: {
        // root: 'E:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss']
    }
};
