const path = require("path");

const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry     : "./__src/index.js",
	output    : {
		path     : __dirname,
		filename : "./__release/bundle.js"
	},
	module    : {
		rules : [
			{
				test    : /\.js?$/,
				exclude : /(node_modules)/,
				loader  : "babel-loader"
			}
		]
	},
	plugins   : [
		new htmlWebpackPlugin({
			template : "./index.html"
		})
	],
	devServer : {
		contentBase : path.join(__dirname, "./__release"),
		open        : true,
		port        : 9000
	}
};
