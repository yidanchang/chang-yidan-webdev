// var mongoose = require('mongoose');
module.exports = function (mongoose) {

    var postingSchema = require('./posting.schema.server');
    var postingModel = mongoose.model('Posting', postingSchema);
    var employerModel = require('../employer/employer.model.server');

    postingModel.createPostingForUser = createPostingForUser;
    postingModel.findAllPostingsForUser = findAllPostingsForUser;
    postingModel.deletePosting = deletePosting;
    postingModel.updatePosting = updatePosting;
    postingModel.findPostingById = findPostingById;
    postingModel.searchByName = searchByName;

    module.exports = postingModel;

    function searchByName(keyword) {
        return postingModel.find({"job_title": new RegExp(keyword, 'i')});
    }

    function updatePosting(postingId, posting) {
        return postingModel
            .update({_id: postingId},
                {$set:
                    {
                        job_title: posting.job_title,
                        location: posting.location,
                        company: posting.company,
                        field: posting.field,
                        description: posting.description
                    }
                });
    }

    function deletePosting(userId, postingId) {
        return postingModel
            .remove({_id: postingId})
            .then(function (status) {
                return employerModel
                    .deletePostingFromUser(userId, postingId);
            });
    }

    function findAllPostingsForUser(userId) {
        return postingModel
            .find({_employer: userId});
    }

    function createPostingForUser(userId, posting) {
        posting._employer = userId;
        return postingModel
            .create(posting)
            .then(function (posting) {
                employerModel
                    .addPostingToUser(userId, posting._id);
                return posting;
            })
    }

    function findPostingById(postingId) {
        return postingModel
            .findById(postingId);
    }

    // function searchJobs(searchObj) {
    //     return postingModel.find(searchObj);
    // }
};