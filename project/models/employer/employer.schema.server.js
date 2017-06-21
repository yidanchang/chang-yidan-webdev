module.exports = function (mongoose) {
    // var mongoose = require('mongoose');

    var employerSchema = mongoose.Schema({
        username: {type: String, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        company: String,
        job_position: String,
        postings: [{type: mongoose.Schema.Types.ObjectId, ref: "Posting"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    module.exports = employerSchema;
};