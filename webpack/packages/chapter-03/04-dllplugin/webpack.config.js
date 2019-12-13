const webpack = require('./node_modules/webpack');

module.exports = {
    output: {
        filename: '[name].[chunkhash].js'
    },
    entry: {
        app: './src/index.js'
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json.js.js.js.js')
        })
    ]
};
