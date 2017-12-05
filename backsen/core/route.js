
// 路由处理程序

module.exports = class Route{

    constructor(options){

        var methods = options.method.split('|');

        var controllerUrl = options.controller;

        var routeUrl = options.route;

        var express = require('express');

        var newRouter = express.Router();

        methods.forEach(function(item){

            var method = item.toLowerCase().replace(/\s/g, "");
            
            if(newRouter[method]){
                
                newRouter[method](routeUrl , function(req , res , next){

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

            }

        })

        return newRouter;

    }

    

}