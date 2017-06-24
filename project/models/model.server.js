module.exports = function (app, mongoose) {
    mongoose.Promise = require('q').Promise;

    require('./employer/employer.schema.server.js')(mongoose);
    require('./employer/employer.model.server.js')(mongoose);

    require('./posting/posting.schema.server.js')(mongoose);
    require('./posting/posting.model.server.js')(mongoose);
};
