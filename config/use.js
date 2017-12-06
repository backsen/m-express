
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 跨域处理控制器
var Proxy = require("./proxy");

module.exports = function(app){

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());


    // 开启跨域
    app.use(function(req, res, next){

        new Proxy(req, res, next);

    })

    return app;

}