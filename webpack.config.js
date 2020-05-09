const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const jsLoaders = () => {
	const loaders = [
		{
			loader: 'babel-loader',
			options: {
				"presets": ["@babel/preset-env"],
			}
		}
	]
	if (isDev) {
		loaders.push('eslint-loader');
	}

	return loaders;
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: './index.js',
	mode: 'development',
	devtool: isDev ? 'source-map' : false,
	output: {
		filename: 'bundle.[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@core': path.resolve(__dirname, 'src/core'),
		}
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					isProd ?
						{
							loader: MiniCssExtractPlugin.loader,
						} :
						{
							loader: 'style-loader',
						},
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: jsLoaders()
			}
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: 'index.html'
		}),
		new CopyPlugin([{
			from: path.resolve(__dirname, 'src/favicon.ico'),
			to: path.resolve(__dirname, 'dist')
		},]
		),
		new MiniCssExtractPlugin({
			filename: 'bundle.[hash].css'
		})
	],
	devServer: {
		port: 3000,
		hot: true
	}
}