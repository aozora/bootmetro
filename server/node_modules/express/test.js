
/**
 * Module dependencies.
 */

var express = require('./')
  , app = express()

console.log(express.json());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser('foobar'));
app.use(express.session());

app.get('/', function(req, res){
  res.send('hello');
});

app.listen(3000);
console.log('listening on 3000');