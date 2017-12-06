module.exports = {

    "/portal": {

        target: "http://10.10.106.168:9000",
        setHeaders: ["X-Requested-With" , "Content-Type" , "Token" , "UserId"]
    }

}