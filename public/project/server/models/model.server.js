module.exports = function (app, mongoose) {
    mongoose.Promise = require('q').Promise;

    require('./user/user.schema.server.js')(mongoose);
    require('./user/user.model.server.js')(mongoose);

    require('./website/website.schema.server.js')(mongoose);
    require('./website/website.model.server.js')(mongoose);

    require('./page/page.schema.server.js')(mongoose);
    require('./page/page.model.server.js')(mongoose);

    require('./widget/widget.schema.server.js')(mongoose);
    require('./widget/widget.model.server.js')(mongoose);
};