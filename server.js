var express = require('express');
var http = require('http');
var path = require('path');

var app = (module.exports = express());

app.set('port', process.env.PORT || 3001);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index.html', { req: req });
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening at http://localhost:' + app.get('port'));
});
