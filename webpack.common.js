const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const globule = require('globule')

const app = {
    entry: {
        'bundle.js': './src/js/main.js',
        'style': './src/scss/style.scss',
        'index': './src/pug/index.pug'
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
                    'import-glob-loader',
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
        new StylelintPlugin({
            configFile: '.stylelintrc.yml'
        }),
        new MiniCssExtractPlugin()
    ]
}

const documents = globule.find(
    './src/pug/*.pug'
)

documents.forEach((document) => {
    const fileName = document.replace('./src/pug/', '').replace('.pug', '.html')
    app.plugins.push(
        new HtmlWebpackPlugin({
            filename: `${fileName}`,
            template: document,
        })
    )
})

module.exports = app
