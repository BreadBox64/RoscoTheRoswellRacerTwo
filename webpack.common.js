const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: "./src/main.ts",
	target: "web",
	output: {
		filename: '[name].js',
		sourceMapFilename: "[file].map",
		path: path.resolve(__dirname, "dist"),
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
			{
				test: /\.js$/,
				use: ["source-map-loader"],
				exclude: [path.resolve(__dirname, "node_modules/excalibur")],
				enforce: "pre",
			},
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	optimization: {
		splitChunks: {
			chunks: "all",
		},
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebPackPlugin({
			title: "Rosco The Roswell Racer Two",
			template: 'index.html',
			inject: 'body'
		}),
		new CopyPlugin({
			patterns: [
				{from: "res/", to: "res/"}
			],
		}),

	],
};
