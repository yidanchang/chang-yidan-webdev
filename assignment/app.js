var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev_summer1_2017');
mongoose.Promise = require('q').Promise;

require("./models/model.server");

require("./services/user.service.server.js");
require("./services/website.service.server.js");
require("./services/page.service.server.js");
require("./services/widget.service.server.js");