
var request = require('request');

// 代理请求

module.exports = class Proxy{

    constructor(req , res , next){

        var path = "http://10.10.106.168:9000" + req.path;

        if(req.method !== "OPTIONS"){

            request({
                method: req.method,
                url: path,
                body: req.body,
                json: true,
                headers: req.headers

            } , function(err , data){
    
                res.json(data.body);
    
            })
        }else{
            res.end();
        }

    }

}