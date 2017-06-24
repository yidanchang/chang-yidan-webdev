module.exports = function (mongoose) {

    var employerSchema = mongoose.Schema({
        username: {type: String, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        company: String,
        job_position: String,
        postings: [{type: mongoose.Schema.Types.ObjectId, ref: "Posting"}],
        followings: [{type: mongoose.Schema.Types.ObjectId, ref: "Employer"}],
        followers: [{type: mongoose.Schema.Types.ObjectId, ref: "Employer"}],
        roles: [{type: String, default: 'USER', enum: ['USER', 'ADMIN']}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    module.exports = employerSchema;
};