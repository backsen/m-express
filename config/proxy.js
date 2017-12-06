
var request = require('request');

var proxys = require('./proxyConfig');

// 代理请求

module.exports = class Proxy{

    constructor(req , res , next){

        var reqUrl = req.originalUrl;
        var urlArrs = reqUrl.split("/");

        urlArrs.splice(0 , 1);
        
        var name = "/" + urlArrs[0];

        var path = "/" + urlArrs.splice(1, urlArrs.length).join("/");

        if(proxys[name]){

            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');

            var defalutSetHeaders = ["X-Requested-With" , "Content-Type"];

            var currentProxyInfo = proxys[name];

            if(currentProxyInfo['setHeaders']){
                defalutSetHeaders = currentProxyInfo['setHeaders'];
            }

            res.header('Access-Control-Allow-Headers', defalutSetHeaders.join(","));

            var url = currentProxyInfo['target'] + path;

            var headers = {};

            for(var i in req.headers){
                if(i !== "content-length"){
                    headers[i] = req.headers[i];
                }
            }

            var body = req.body;

            var method = req.method;

            if(currentProxyInfo['headers']){

                for(var key in currentProxyInfi['headers']){
                    headers[key] = currentProxyInfi['headers'][key];
                }

            }

            
            if(req.method !== "OPTIONS"){
                
                // console.log(`Proxy [${method}] to url: ${url}`);

                request({
                    method: method,
                    body: body,
                    json: true,
                    url: url,
                    headers: headers

                } , function(err , data){
                    
                    res.json(data);
        
                })

            }else{
                res.end();
            }


        }else{

            next();
        }

    }

}