
var Core = require("./core");

// 引导程序类

class Bootstrap{

    constructor(){

    }

    start(app){

        return new Core(app);

    }

}

module.exports = new Bootstrap;