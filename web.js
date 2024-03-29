//-----------------------------------------//
//-------------Node Application------------//
//-----------------------------------------//

var express = require('express')
  , routes  = require('./routes')
  , http    = require('http')
  , path    = require('path')
  , io      = require('socket.io');


// Express
//-----------------------------------------//
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.engine('html', require('hbs').__express);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '/public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


// Socket.io
//-----------------------------------------//
var socket = io.listen(server);

socket.on('connection', function (socket) {
  socket.emit('data', { data: 'data' });
});
