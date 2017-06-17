var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    facebook: {
        id:    String,
        token: String
    },
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "AssignmentWebsiteModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "assignment_user"});

module.exports = userSchema;