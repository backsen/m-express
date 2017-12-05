var routes = [
    {
        "path": "/",
        "controller": "/index",
        "method": "get"
    },
    {
        "path": "/apis",
        "controller": "/proxy",
        "route" : "/*",
        "method": "get|post"
    }
]

module.exports = routes;