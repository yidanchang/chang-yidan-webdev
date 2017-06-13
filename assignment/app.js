var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/webdev_summer1_2017'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds031601.mlab.com:31601/heroku_lk22crx9'; // user yours
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

// mongoose.connect('mongodb://localhost/webdev_summer1_2017');
// mongoose.Promise = require('q').Promise;

require("./models/model.server");

require("./services/user.service.server.js");
require("./services/website.service.server.js");
require("./services/page.service.server.js");
require("./services/widget.service.server.js");