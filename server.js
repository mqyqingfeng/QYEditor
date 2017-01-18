var path = require('path');
var webpack = require('webpack');
var express = require('express');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var fs = require('fs');
var _ = require('lodash');

var bodyParser = require('body-parser')
var app = express();
var compiler = webpack(config);

app.use(bodyParser.urlencoded({ extended: false }))

app.use(devMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
}));

app.use(hotMiddleware(compiler));


// const login = require('./server/login.js');

app.use(express.static(__dirname))

app.all('*', function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "text/html");
    next();
})

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});

// app.post('/api/login', login.login);

app.listen(3001, function(err) {
    if (err) {
        return console.error(err);
    }

    console.log('Listening at http://localhost:3001/');
});
