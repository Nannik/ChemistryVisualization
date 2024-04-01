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
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.glsl$/,
                    loader: 'raw-loader'
                }
            ]
        },
        plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
        devServer: {
            compress: true,
            port: 3000,
        }
    }
}