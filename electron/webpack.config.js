const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = false;

module.exports = {
	mode: dev? 'development' : 'production',
	entry: "./src/main.js",
	output: {
		path: __dirname+'/dist',
		filename: 'app.bundle.js',
	},
	module: {
		rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|mp3)$/i,
				use: ['file-loader'],
			},
        ]
	},
	resolve: {
		extensions: ['.jsx', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
	],
};