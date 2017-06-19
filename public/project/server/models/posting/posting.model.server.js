// var mongoose = require('mongoose');
module.exports = function (mongoose) {

    var postingSchema = require('./posting.schema.server');
    var postingModel = mongoose.model('ProjectPostingModel', postingSchema);
    var employerModel = require('../employer/employer.model.server');

// api
// postingModel.findAllpostings = findAllpostings;
    postingModel.createPostingForEmployer = createPostingForEmployer;
    postingModel.findAllPostingsForEmployer = findAllPostingsForEmployer;
    postingModel.deletePostingFromEmployer = deletePostingFromEmployer;
    postingModel.updatePosting = updatePosting;
    postingModel.findPostingById = findPostingById;
    postingModel.addApplicationsToPosting = addApplicationsToPosting;
    postingModel.deleteApplicationsFromPosting = deleteApplicationsFromPosting;

    module.exports = postingModel;

    function deleteApplicationsFromPosting(postingId, applicationId) {
        return postingModel
            .findById(postingId)
            .then(function (posting) {
                var index = posting.applications.indexOf(applicationId);
                posting.applications.splice(index, 1);
                return posting.save();
            });
    }

    function addApplicationsToPosting(postingId, applicationId) {
        return postingModel
            .findById(postingId)
            .then(function (posting) {
                posting.applications.push(applicationId);
                return posting.save();
            });
    }

    function updatePosting(postingId, posting) {
        return postingModel
            .update({_id: postingId},
                {
                    name: posting.name,
                    description: posting.description
                });
    }

    function deletePostingFromEmployer(employerId, postingId) {
        return postingModel
            .remove({_id: postingId})
            .then(function (status) {
                return employerModel
                    .deletePostingFromEmployer(employerId, postingId);
            });
    }

    function findAllPostingsForEmployer(userId) {
        return postingModel
            .find({_user: userId})
            .populate('_user')
            .exec();
    }

    function createPostingForEmployer(employerId, posting) {
        posting._employer = employerId;
        // return postingModel
        //     .create(posting);
        return postingModel
            .create(posting)
            .then(function (posting) {
                employerModel.addPostingToEmployer(employerId, posting._id);
                return posting;
            })
    }

// function findAllpostings() {
//     return postingModel.find();
// }

    function findPostingById(postingId) {
        return postingModel
            .findById(postingId);
    }
}