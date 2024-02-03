const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => {

    return {
        mode: 'development',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js',
        },
        plugins: [new HtmlWebpackPlugin({ template: './src/static/index.html' })],
        devServer: {
            static: {
                directory: path.join(__dirname, 'src/static'),
            },
            compress: true,
            port: 3000,
        },
    }
}