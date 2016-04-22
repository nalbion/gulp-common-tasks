
module.exports = function (req, res, next) {
    var path = require('path'),
        fs = require('fs'),
        httpProxy = require('http-proxy');

    var mockProxy = httpProxy.createProxyServer({
        target: 'http://localhost:3000/mock-server/'
    });

    console.info('req:', req.url);
    var match = req.url.match(/^(\/api\/[^\?]+)(\?.*)?/);
    if (match) {
        var reqPath = match[1];
        reqPath = path.resolve('mock-server') + reqPath;
        if (fs.existsSync(reqPath + '.js')) {
            res.end(require(reqPath + '.js')(req, res));
        } else if (fs.existsSync(reqPath)) {
            mockProxy.web(req, res);
        } else {
            res.end('hacked from gulpfile for ' + req.url);
        }
    } else {
        next();
    }
};