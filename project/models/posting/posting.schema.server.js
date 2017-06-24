module.exports = function (mongoose) {
    var postingSchema = mongoose.Schema({
        _employer: {type: mongoose.Schema.Types.ObjectId, ref: "Employer"},
        job_title: String,
        location: String,
        company: String,
        field: String,
        description: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'project.posting'});

    module.exports = postingSchema;
}