const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
    entry: {
        'main.js': './src/js/main.js',
        'style.css': './src/scss/style.scss',
        'index.pug': './src/pug/index.pug'
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            'presets': [
                                [
                                    '@babel/preset-env',
                                    {
                                        'useBuiltIns': 'entry'
                                    }
                                ]
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    'css-hot-loader', MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => [require('autoprefixer')]
                        }
                    },
                ]
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/pug/index.pug'
        }),
        new StylelintPlugin({
            configFile: '.stylelintrc.yml'
        }),
        new MiniCssExtractPlugin()
    ]
}
