require('./api/data/db.js');

var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var MongoDBStore = require('connect-mongodb-session')(session);
var routes = require('./api/routes');

var store = new MongoDBStore({
  uri: 'mongodb://jovon07:Bulldogs1@ds237308.mlab.com:37308/srsstyles',
  databaseName: 'srsstyles',
  collection: 'carts'
},
function(error) {
  // Should have gotten an error
  console.log(error);
});

store.on('error', function(error) {
  console.log(error);
})

const stripe = require('stripe')('sk_test_dd14u9bpNSzvL3awpktO0JFp00qudlxMUK');

(async () => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      name: 'T-shirt',
      description: 'Comfortable cotton t-shirt',
      images: ['https://example.com/t-shirt.png'],
      amount: 500,
      currency: 'usd',
      quantity: 1,
    }],
    success_url: '/purchaseSuccess?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: '/cancelPurchase',
  });
})();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: 'mysupersecret',
    cookie: {
      maxAge: 180 * 60 * 1000, // 3 hours
      secure: false
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  req.session.cookie.maxAge = 180 * 60 * 1000;
    next();
});





// Define the port to run on
app.set('port', (process.env.PORT || 5000));


// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));


app.set('views', __dirname + '/views');
app.set('view engine', 'html');


app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/fonts', express.static(__dirname + '/fonts'));

// Add some routing
app.use('/api', routes);

app.get('/', function(req, res) {
  res.sendfile('public/index.html');
}); 

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});