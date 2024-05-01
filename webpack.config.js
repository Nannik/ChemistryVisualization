const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
    mode: 'development',
    entry: './src/index.ts',
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
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(glsl|obj|mtl)$/,
                loader: 'raw-loader',
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@webgl': path.resolve(__dirname, 'src/webgl/'),
            '@glsl': path.resolve(__dirname, 'src/glsl/'),
            '@shared': path.resolve(__dirname, 'src/shared/'),
            '@assets': path.resolve(__dirname, 'src/assets'),
        },
    },
    plugins: [ new HtmlWebpackPlugin({ template: './public/index.html' }) ],
    devServer: {
        compress: true,
        port: 3000,
    },
});
