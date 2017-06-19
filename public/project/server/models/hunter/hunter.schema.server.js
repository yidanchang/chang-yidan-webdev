module.exports = function (mongoose) {
    // var mongoose = require('mongoose');

    var hunterSchema = mongoose.Schema({
        hunter_username: {type: String, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        major: String,
        facebook: {
            id: String,
            token: String
        },
        applications: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectApplicationModel"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project_hunter"});

    module.exports = hunterSchema;
};