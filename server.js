// var express = require('express');
// var app = express();
var app = require('./express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: "this is secret!"}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://api.indeed.com");
//     console.log('header')
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     next();
// });

// app.get('/project/index.html', function (req, res) {
//     console.log('writing header');
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.sendFile(__dirname + '/public/project/index.html')
//     // res.end('')
// });

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

// require ("./test/app.js")(app);

require('./assignment/app');

// require('./public/project/indeed.service.server');

var port = process.env.PORT || 3000;

app.listen(port);