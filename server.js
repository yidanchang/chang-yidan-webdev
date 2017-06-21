var express = require('express');
var app = express();
// var app = require('./express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
// app.use(session({ secret: "this is secret!"}));
app.use(session({
    secret: "this is the secret",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// configure a public directory to host static content
// app.use(app.express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

var connectionString = 'mongodb://127.0.0.1:27017/webdev_summer1_2017'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds031601.mlab.com:31601/heroku_lk22crx9'; // user yours
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);

require ("./test/app.js")(app, mongoose);
// require ("./assignment/app.js")(app, mongoose);


// require ("./test/app.js")(app);

// require('./assignment/app');

require('./project/app.js')(app, mongoose);

// require('./public/project/indeed.service.server');

var port = process.env.PORT || 3000;

app.listen(port);