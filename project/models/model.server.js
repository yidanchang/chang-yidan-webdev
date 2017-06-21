module.exports = function (app, mongoose) {
    mongoose.Promise = require('q').Promise;

    // require('./hunter/hunter.schema.server.js')(mongoose);
    // require('./hunter/hunter.model.server.js')(mongoose);

    require('./employer/employer.schema.server.js')(mongoose);
    require('./employer/employer.model.server.js')(mongoose);

    require('./posting/posting.schema.server.js')(mongoose);
    require('./posting/posting.model.server.js')(mongoose);
    //
    // require('./application/application.schema.server.js')(mongoose);
    // require('./application/application.model.server.js')(mongoose);
};
