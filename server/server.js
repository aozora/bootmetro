/**
 * Created with JetBrains WebStorm.
 * User: marcellopalmitessa
 * Date: 7/12/12
 * Time: 7:08 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Module dependencies.
 */

var web_path = __dirname + '/../_gh_pages/'
   ,express = require('express')
   ,http = require('http')
   ,fs = require('fs')
   ,path = require('path');


// express 3.x app
var app = express();


// Configure express
// ------------------------------------
//   var uploadDir = __dirname + '/uploads-tmp';
//   console.log('upload dir: ' + uploadDir);
//app.use(express.bodyParser({uploadDir:uploadDir}));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

app.configure('development', function(){
   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
   app.use(express.errorHandler());
});


app.use(express.logger(':method :url :status'));

// enable GZip compression
app.use(express.compress());

// serve static files
app.use(express.static(web_path));

//// express router
//app.use(app.router);


// Start the app by listening on <port>
var port = process.env.PORT || 8080;

http.createServer(app).listen(port);
console.log('Express app started on port ' + port);
