
var express = require('express');
var router = express.Router();

// 路由处理程序

module.exports = class Route{

    constructor(options){

        var method = options.method.toLowerCase();

        var controllerUrl = options.controller;

        var routeUrl = options.route;

        if(router[method]){

            return router[method](routeUrl , function(req , res , next){

                if(options['controllerType'] === 'class'){

                    var controller = require(controllerUrl);
                    new controller(req , res , next);

                }else if(options['controllerType'] === 'callback'){
                    
                    var controller = require(controllerUrl);
                    controller(req , res , next);
                    
                }
                

            })

        }else{

            console.error(`error: ${method} is not a method`);

            return router;

        }

    }

    

}