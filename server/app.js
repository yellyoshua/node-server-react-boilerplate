const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const CopyPlugin = require("copy-webpack-plugin");
const webpackConfig = require('../webpack.config')(CopyPlugin);
const express = require('express');

const isDevelopment = process.env.NODE_ENV !== 'production';

const app = express();

app.use(express.static(__dirname + '../dist'));
app.use(express.json({type: 'application/json'}));
app.use(express.urlencoded({extended: true}));

if (isDevelopment) {
	const compiler = webpack(webpackConfig);
	app.use(webpackMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: {
			colors: true
		}
	}));
}

app.get('/api/users', (req, res) => {
	res.json([
		{
			id: 1,
			name: 'John Doe'
		},
		{
			id: 2,
			name: 'Jane Doe'
		}
	]);
});

app.listen(9000, () => {
	console.log('Server started on port 9000');
});
