# m-express
基于express的快速开始项目,通过少量配置即可使用，引入控制器概念

## 控制器（controller）

控制器是m-express的业务处理程序 ，可以是class类型，也可以是es5的callback类型

> class
```

module.exports = class IndexContrell{

  constructor(req , res , next){

    // ...
    res.render('index', { title: 'Express' });

  }

}

```
> callback
```

module.exports = function(req , res , next){

  // ...

  res.render('index', { title: 'Express' });

}

```

## 配置文件

配置文件放在根目录的backsen.config.js里面

```
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

    controllerRootPath: '/routes', // 路由根路径 -> /src/routes

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
     * method：路由要绑定的请求方式 -> post | get | put | delete等; 可空，默认 "get"
     * route：路由 -> router.get(route , callback)；可为空，默认 "/"
     * controllerType：控制器的类型 -> callback | class; 可空，在配置中可全局指定，如未全局指定，则默认class，详细解释看配置文件controllerType描述
     */

    routes: require('./routes.json'), // 加载路由配置

    views: "/art-temp", // 指定模板存放地址 -> /src/art-temp

    temp: function(app){ // 重置模板引擎

        app.engine('.html',template.__express);
        app.set('view engine','html');
        
    },

    app: function(app){ // 自定义app ， 如：中间件等

        var appSettingFn = require('./use');

        return appSettingFn(app);

    }

}
```

