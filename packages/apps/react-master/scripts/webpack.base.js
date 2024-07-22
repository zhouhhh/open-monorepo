const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require('path');


module.exports = function (isDev) {
    return {
        entry: path.resolve(__dirname, '../src/index.tsx'),
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'static/js/[name].[hash:8].js',
            clean: true,
            publicPath: '/'
        },
        resolve: {
            extensions: ['.tsx', '.jsx', '.ts', '.js'],
            // fallback: {
            //     'vm': false,
            //     'os': false,
            //     'stream': false,
            //     'path': false,
            //     'http': false,
            //     'https': false,
            //     'tty': false
            // }
        },
        module: {
            rules: [
                {
                    test: /\.(tsx|ts|jsx|js)$/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
                {
                    oneOf: [
                        {
                            test: /\.module\.(less|css)/,
                            include: [path.resolve(__dirname, '../src')],
                            use: [
                                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                                {
                                    loader: 'css-loader'
                                },
                                "postcss-loader",
                                "less-loader"
                            ]
                        },
                        {
                            test: /\.css$/,
                            use: [
                                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                                'css-loader',
                                "postcss-loader",
                            ]
                        },
                        {
                            test: /\.less$/,
                            use: [
                                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                                'css-loader',
                                "postcss-loader",
                                "less-loader"
                            ]
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|webp)$/,
                    generator: {
                        filename: 'static/images/[name].[contenthash][ext]',
                    }
                },
                {
                    test: /\.(mp4|mp3|wmv|flv)$/,
                    generator: {
                        filename: 'static/media/[name].[contenthash][ext]',
                    }
                },
                {
                    test: /\.(eot|ttf|otf)$/,
                    generator: {
                        filename: 'static/fonts/[name].[contenthash][ext]',
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.html')
            }),
            new MiniCssExtractPlugin({
                filename: isDev ? 'static/css/[name].css' : 'static/css/[name].[contenthash:4].css'
            }),
            // new NodePolyfillPlugin()
        ]
    }
}