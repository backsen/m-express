
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

        // 设置模板引擎

        this.app = this.setTemp();

        // 配置中间件 ， 在路由加载之前
        
        this.app = this.setRouteBefor();

        // 设置静态文件配置

        this.app = this.setStatic();

        // 设置路由

        this.app = this.setRoutes(config.routes);

        // 配置中间件 ， 在路由加载之后

        this.app = this.setRouteAfter();

        return this.app;

    }

    setRouteBefor(){

        if(config.routeBefor && typeof config.routeBefor == "function"){

            return config.routeBefor(this.app) || this.app;

        }

        return this.app;

    }

    setRouteAfter(){

        if(config.routeAfter && typeof config.routeAfter == "function"){
            
            return config.routeAfter(this.app) || this.app;

        }

        return this.app;

    }

    setRoutes(routes){
        
        var routeBefor = this.rootPath + (config.controllerRootPath || '') , self = this;

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
            self.app.use(newRoute.path , new Route(newRoute));

        }.bind(this));

        // console.log(this.app);

        return this.app;

    }

    setTemp(){

        var viewPath = this.rootPath + (config.views || "/views");

        this.app.set('views', viewPath);

        if(config.temp && typeof config.temp === "function"){

            this.app = config.temp(this.app);

        }else{
            this.app.set('view engine', 'jade');
        }

        return this.app;

    }

    setStatic(){

        var staticPath = this.rootPath + (config.staticRootPath || "/public");

        this.app.use(express.static(staticPath));
        
        return this.app;
    }

}