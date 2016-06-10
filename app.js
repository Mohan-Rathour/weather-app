// set up ========================
var express  = require("express");
var app      = express();                                 // create our app w/ express
var bodyParser = require("body-parser");                  // pull information from HTML POST (express4)
var methodOverride = require("method-override");          // simulate DELETE and PUT (express4)
var cookieParser = require("cookie-parser");
var winston = require("./src/logger/");                   // log requests to the console (express4)
var config = require('./config/dev');
var util = require("util");
var http = require('http');
var path = require('path');

var requestHandler = require('./src/resource/requestHandler');

//Configuration for the app.
app.set("port", config.node.port || 9999);
app.use(cookieParser());
app.use(methodOverride());
app.use(bodyParser.urlencoded({extended: true}));        // parse application/x-www-form-urlencoded
app.use(bodyParser.json());												       // parse application/json
app.use(express.static(path.join(__dirname, "public"))); //set the static files location /public/img will be /img for users

app.use(function(err, req, res, next) {
  winston.error(util.inspect(err));
  res.send({
    "Error":util.inspect(err)
  });
  res.end();
});
app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == req.method)
    return res.send(200);
  next();
});

app.get("/getWeatherReport", requestHandler.getWeatherReport);

//Create a http server.
http.createServer(app).listen(app.get('port'),function(){
 console.log("Node server is running on port %s", app.get('port'));

});

