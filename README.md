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
  controllerType: 'class',
  rootPath: '/src',
  staticRootPath: '/public',
  controllerRootPath: '/routes',
  port: 3200,
  routes: require('./routes.json'),
  views: "/art-temp",
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

