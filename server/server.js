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
   ,bodyParser = require('body-parser')
   ,methodOverride = require('method-override')
   ,errorHandler = require('errorhandler')
   ,logger = require('morgan')
   ,compress = require('compression')
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
//app.use(express.bodyParser()); //deprecated
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.methodOverride());//deprecated
app.use(methodOverride());

//app.use(app.router);//deprecated

//app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));//deprecated
app.use(errorHandler({ dumpExceptions: true, showStack: true }));


/*below is deprecated
app.configure('development', function(){
   //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));//deprecated
   app.use(errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
   //app.use(express.errorHandler());//deprecated
   app.use(errorHandler());
});
*/

// all environments
app.set('title', 'Application Title');

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}

// production only
if ('production' == app.get('env')) {
  app.use(errorHandler());
}


//app.use(express.logger(':method :url :status'));//deprecated
app.use(logger(':method :url :status'));

// enable GZip compression
//app.use(express.compress());//deprecated
app.use(compress());

// serve static files
app.use(express.static(web_path));

//// express router
//app.use(app.router);


// Start the app by listening on <port>
var port = process.env.PORT || 8080;

http.createServer(app).listen(port);
console.log('Express app started on port ' + port);
