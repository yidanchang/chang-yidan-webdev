// var mongoose = require('mongoose');
module.exports = function (mongoose) {

    var employerSchema = require('./employer.schema.server');
    var employerModel = mongoose.model('ProjectEmployerModel', employerSchema);

    employerModel.createEmployer = createEmployer;
    employerModel.findUserById = findUserById;
    employerModel.findAllUsers = findAllUsers;
    employerModel.findUserByUsername = findUserByUsername;
    employerModel.findUserByCredentials = findUserByCredentials;
    employerModel.updateUser = updateUser;
    employerModel.deleteUser = deleteUser;
    employerModel.addPostingToEmployer = addPostingToEmployer;
    employerModel.deletePostingFromEmployer = deletePostingFromEmployer;
    employerModel.findUserByFacebookId = findUserByFacebookId;

    module.exports = employerModel;

    function findUserByFacebookId(facebookId) {
        return employerModel.findOne({'facebook.id': facebookId});
    }


    function deletePostingFromEmployer(employerId, postingId) {
        return employerModel
            .findById(employerId)
            .then(function (employer) {
                var index = employer.postings.indexOf(postingId);
                employer.postings.splice(index, 1);
                return employer.save();
            });
    }

    function addPostingToEmployer(employerId, postingId) {
        return employerModel
            .findById(employerId)
            .then(function (employer) {
                employer.postings.push(postingId);
                return employer.save();
            });
    }

    function createEmployer(employer) {
        return employerModel.create(employer);
    }

    function findUserById(employerId) {
        return employerModel.findById(employerId);
    }

    function findAllUsers() {
        return employerModel.find();
    }

    function findUserByUsername(username) {
        return employerModel.findOne({employer_username: username});
    }

    function findUserByCredentials(username, password) {
        return employerModel.findOne({employer_username: username, password: password});
    }

    function updateUser(employerId, newemployer) {
        delete newemployer.employer_username;
        delete newemployer.password;
        return employerModel.update({_id: employerId}, {$set: newemployer});
    }

    function deleteUser(employerId) {
        return employerModel.remove({_id: employerId});
    }
}