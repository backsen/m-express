var template = require('art-template');

module.exports = {

    /**
     * 控制器类型
     * 可选：callback、class
     * callback: module.exports = function callbackName(req , res , next){}
     * class: module.exports = class ClassName{
     *      constructor(req , res , next){
     *          // ...
     *      }
     * }
     * 
     * 推荐class ， 如果指定class ， 无需在导出类的时候实例化
     * 
     * 默认为class ， 可在路由配置中为不同的控制器指定不同的类型
     * 
     * {
     *   "path": "/",
     *   "controller": "/index",
     *   "method": "get",
     *   "controllerType": "callback"
     * }
     * 
     */
    controllerType: "class",

    rootPath: '/src', // app根目录

    staticRootPath: '/public', // 静态文件根目录，如css、js、img -> /src/public

    controllerRootPath: '/controllers', // 路由根路径 -> /src/routes

    port: 3200, // 监听端口

    /**
     * 路由配置
     * 类型：Array<string|object>
     * [
     *  "/index",
     *  {
     *      path: "/",
     *      controller: "/index",
     *      method: "get",
     *      route: "/:id",
     *      controllerType: "class"
     *  }
     * ]
     * 
     * 如果是字符串(/index)类型，则会转换成下面对象的形式
     *  /index
     *  {
     *      path: "/index",
     *      controller: "/index",
     *      method: "get",
     *      route: "/",
     *      controllerType: "class" 
     *  }
     * 
     * 其中controllerType会先读取配置文件controllerType，如果未定义，则默认class
     * 
     * 字段说明：
     * path：路径 -> app.use(path , callback)；必须
     * controller: 控制器 当前路由的处理程序控制器  -> router.get(route , controller)； 必须
     * method：路由要绑定的请求方式 -> post | get | put | delete等; 可空，默认 "get" 。 通过竖线(|)可多选：method: 'get|post'
     * route：路由 -> router.get(route , callback)；可为空，默认 "/"
     * controllerType：控制器的类型 -> callback | class; 可空，在配置中可全局指定，如未全局指定，则默认class，详细解释看配置文件controllerType描述
     */

    routes: require('./config/routes'), // 加载路由配置

    views: "/art-temp", // 指定模板存放地址 -> /src/art-temp

    temp: function(app){ // 重置模板引擎

        app.engine('.html',template.__express);
        app.set('view engine','html');

        return app;
        
    },

    routeBefor: function(app){ // 自定义app ， 如：中间件等。会在加载路由之前执行,请勿把错误处理程序放在app里插入

        var appSettingFn = require('./config/use');

        return appSettingFn(app);

    },

    routeAfter: function(app){ // 自定义app ， 如：错误处理。在路由加载后执行

        app.use(function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        
        app.use(function(err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });

        return app;

    }

}