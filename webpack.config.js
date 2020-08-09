const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src', 'index.ts'),
	devtool: 'inline-source-map',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.tsx?/,
				use: ['ts-loader'],
			},
			{
				test: /\.scss/,
				use: [
					'style-loader',
					'scss-loader',
				],
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			filename: 'index.html'
		}),
	],
	devServer: {
		host: '0.0.0.0',
		port: 8082,
		contentBase: path.resolve(__dirname, 'dist'),
		disableHostCheck: true,
		compress: true,
	}
}
