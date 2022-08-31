const path = require('path');

module.exports = (CopyPlugin) => {
	const clientPath = path.resolve(__dirname, "client");
	const serverPath = path.resolve(__dirname, "server");

	return {
		entry: path.resolve(clientPath, "src/index.js"),
		mode: "development",
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react']
						}
					}
				},
				{
					test: /\.css$/,
					exclude: /node_modules/,
					use: ['style-loader', 'css-loader']
				},
				{
					test: /\.svg$/,
					exclude: /node_modules/,
					use: ['url-loader']
				}
			]
		},
		plugins: [
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(clientPath, "public"),
						to: path.resolve(serverPath, "public")
					}
				]
			})
		],
		optimization: {},
		output: {
			path: path.resolve(serverPath, "public"),
			filename: 'app.js'
		},
	}
};
