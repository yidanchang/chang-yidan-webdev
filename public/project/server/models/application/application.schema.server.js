module.exports = function (mongoose) {
    // var mongoose = require('mongoose');

    var applicationSchema = mongoose.Schema({
        _hunter: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectHunterModel"},
        name: String,
        description: String,
        applied: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectPostingModel"},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'project_application'});

    module.exports = applicationSchema;
};