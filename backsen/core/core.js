
var express = require('express');

var path = require('path');

var rootPath = path.resolve();

var config = require(rootPath + "/backsen.config");

var Route = require("./route");

// 核心程序类

module.exports = class Core{

    constructor(app){

        this.app = app;
        this.rootPath = rootPath + (config.rootPath || "");
        this.app['CoreConfig'] = {
            port: config.port || "3100"
        }

        return this.setRoutes(config.routes);

    }

    setApp(){

        if(config.app && typeof config.app == "function"){

            return config.app(this.app);

        }

        return this.app;

    }

    setRoutes(routes){
        
        var routeBefor = this.rootPath + (config.controllerRootPath || '');

        routes.forEach(function(route){

            var newRoute = route;

            if(typeof route === "string"){

                newRoute = {
                    path: route,
                    controller: routeBefor + route,
                    route: '/',
                    method: 'GET',
                    controllerType: config.controllerType || "calss"
                }

            }else{

                newRoute['controller'] = routeBefor + route.controller;
                
            }

            newRoute.controllerType = newRoute.controllerType || (config.controllerType || "calss");
            newRoute.route = newRoute.route || "/";
            newRoute.method = newRoute.method || "GET";
            
            // 写入路由
            this.app.use(newRoute.path , new Route(newRoute));

        }.bind(this));

        return this.setTemp();

    }

    setTemp(){

        var viewPath = this.rootPath + (config.views || "/views");

        this.app.set('views', viewPath);

        if(config.temp && typeof config.temp === "function"){

            config.temp(this.app);

        }else{
            this.app.set('view engine', 'jade');
        }

        return this.setStatic();

    }

    setStatic(){

        var staticPath = this.rootPath + (config.staticRootPath || "/public");

        this.app.use(express.static(staticPath));
        
        return this.setApp();
    }

}