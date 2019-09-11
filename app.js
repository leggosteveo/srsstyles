var express = require('express');
var app = express();
var path = require('path');


// Define the port to run on
app.set('port', (process.env.PORT || 5000));


// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));


app.set('views', __dirname + '/views');
app.set('view engine', 'html');


app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/fonts', express.static(__dirname + '/fonts'));

// Add some routing
app.get('/', function(req, res) {
  res.sendfile('public/index.html');
}); 

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});