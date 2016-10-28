var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var sha256 = require('sha256');
var cp = require('child_process');   
  
var routes = require('./routes/index');
var users = require('./routes/users');
var inventory = require('./routes/inventory');
var customers = require('./routes/customers');
var products = require('./routes/products');

var api = require('./routes/api');
var menu_routes = require('./routes/menu-routes.js');
var api_users = require('./routes/api/users');

var app = express();
app.set('trust proxy', 1); // trust first proxy
app.use(cookieSession({
  name: 'session',
  keys: ['8BitKey#1!', 'ThisIsAnotherKey#2!']
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.all('/api/users*', function (req, res, next) {
  if ( !req.session || !req.session.me ){
    res.status(401).send("Unauthorized")
  } else {
    next(); // pass control to the next handler
  }
});


app.use('/', routes);
app.use('/users', users);
app.use('/inventory', inventory);
app.use('/customers', customers);
app.use('/products', products);



//app.use('/api', api);
app.use('/api/users', api_users);

app.get('/api/oneirusers',api.oneirusers);
app.get('/data/:user/company',api.data);
app.post('/login',api.login);
app.get('/logout',api.logout);
app.post('/register',api.register);

app.get('/login_check',menu_routes.login_check);
app.get('/oneir',menu_routes.oneir);
app.get('/browser_tab_id',menu_routes.browser_tab_id);
app.get('/oneir_commands',menu_routes.oneir_commands);
app.get('/setCompany',menu_routes.setCompany);
app.get('/getCompany',menu_routes.getCompany);
app.get('/getMenu',menu_routes.getMenu);
app.get('/ms',menu_routes.getCmps);
app.get('/getTabId',menu_routes.getTabId);
app.get('/getHideWindow',menu_routes.getHideWindow);
app.get('/setHideWindow',menu_routes.setHideWindow);
app.get('/setTelnetID',menu_routes.setTelnetID);
app.get('/getTelnetID',menu_routes.getTelnetID);

app.get('/getBrowserClosureTabID',menu_routes.getBrowserClosureTabID);
app.get('/setBrowserClosureTabID',menu_routes.setBrowserClosureTabID);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/* initializing rethinkdb*/
var us = require('./services/api/UserService');
us.add(
    {
      "name":"ADMINISTRATOR"
      , "username":"admin"
      , "password":sha256.x2("password")
      , "admin":true
      , "passwordChangeNeeded":true
    },
    function(err, success){
  if(success == true){
    console.log("Admin added");
  } else {
    console.warn("Admin ad failed:");
    if (err){
      console.warn(err);
    } else {
      console.warn("Admin already added");
    }

  }
});

us.all(function(err, users){
  console.log(users)
})
module.exports = app;


