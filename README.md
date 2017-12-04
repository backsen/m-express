# m-express
基于express的快速开始项目,通过少量配置即可使用，引入控制器概念

## 控制器（controller）

```

module.exports = class IndexContrell{

  constructor(req , res){

    res.render('index', { title: 'Express' });

  }

}

```


