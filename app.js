/*eslint-disable no-undef-expression */
/*globals routes */
var express = require('express');
var cfenv = require('cfenv');
var app = express();
var path = require('path');
var logger = require('./routes/logger');
var http = require('http');

var port = process.env.VCAP_APP_PORT || 3000;


// all environments
app.set('port', port || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.post('/logger', logger.addLog);


//app.delete('/wines/:id', wines.deleteWine);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.use(express.static(__dirname + '/public'));

var appEnv = cfenv.getAppEnv();
app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});