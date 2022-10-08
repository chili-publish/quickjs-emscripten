const path = require('path');
const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './ts/index.ts',

    output: {
        path: path.resolve(__dirname, 'dist_pack'),
        filename: 'bundle.js',
        library: 'chili_quickjs',
        libraryTarget: 'assign'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: { "path": false, "fs": false, "crypto": false }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new CopyPlugin({
            patterns: [
              { from: "*.wasm", to: "", context: "dist/generated" },
            ],
          }),
    ],
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader" },
            { test: /\.wasm$/, type: "asset/resource" }
        ]

    }
};