var http = require('http');

http.createServer(request,response).listen(3000, function(){
  console.log('Express server listening on port 3000');
});