module.exports = function (mongoose) {
    // var mongoose = require('mongoose');

    var postingSchema = mongoose.Schema({
        _employer: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectEmployerModel"},
        location: String,
        job: String,
        description: String,
        applications: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectApplicationModel"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'project_posting'});

    module.exports = postingSchema;
}