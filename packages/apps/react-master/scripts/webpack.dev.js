const { merge } = require('webpack-merge')
const getBaseCfg = require('./webpack.base')
const path = require('path')

module.exports = merge(getBaseCfg(), {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        port: 3008,
        compress: false,
        hot: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, '../public')
        }
    }
})