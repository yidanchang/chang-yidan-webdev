module.exports = function (mongoose) {
    // var mongoose = require('mongoose');

    var employerSchema = mongoose.Schema({
        employer_username: {type: String, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        company: String,
        job_position: String,
        facebook: {
            id: String,
            token: String
        },
        postings: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectPostingModel"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project_employer"});

    module.exports = employerSchema;
};