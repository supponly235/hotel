const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const loader = require('sass-loader');

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}
console.log(mode + ' mode')

module.exports = {
    mode: mode, 
    output: {
        filename: '[name].[contenthash].js',
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true,
    },
    devtool: 'source-map',
    optimization: {
        splitChunks:{
            chunks: 'all'
        },
    },
    devServer: {
        open: true,
        hot: true,
        port: 'auto',
        static: {
            directory: './src',
            watch: true,
        },
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.pug"
        }),
        new HtmlWebpackPlugin({
        template: "./src/pages/ui-kit-colors-type/ui-kit-colors-type.pug",
            filename: "ui-kit-colors-type.html"
        }),
        new HtmlWebpackPlugin({
        template: "./src/pages/ui-kit-cards/ui-kit-cards.pug",
            filename: "ui-kit-cards.html"
        }),
],
    module: {
        rules:[
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
            ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.pug$/,
                    loader:'pug-loader',
                    exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            }
            //{
            //test: /\.(woff|woff2|eot|ttf|otf)$/i,
            //type: 'asset/resourse',
            //},
        ]
    },
}