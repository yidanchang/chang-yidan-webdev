module.exports = function (app, mongoose) {
    require("./models/model.server.js")(app, mongoose);

    require('./services/employer.service.server.js')(app);
    require('./services/posting.service.server.js')(app);
};