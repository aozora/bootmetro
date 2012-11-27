
/**
 * Module dependencies.
 */

var http = require('http');

var body = 'hello'
http.createServer(function(req, res){
  res.setHeader('Content-Length', body.length);
  res.end(body)
}).listen(3000)