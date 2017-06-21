// var mongoose = require('mongoose');
module.exports = function (mongoose) {
    var employerSchema = require('./employer.schema.server.js');
    var employerModel = mongoose.model('Employer', employerSchema);

    employerModel.createUser = createUser;
    employerModel.findUserById = findUserById;
    employerModel.findAllUsers = findAllUsers;
    employerModel.findUserByUsername = findUserByUsername;
    employerModel.findUserByCredentials = findUserByCredentials;
    employerModel.updateUser = updateUser;
    employerModel.deleteUser = deleteUser;
    employerModel.addPostingToUser = addPostingToUser;
    employerModel.deletePostingFromUser = deletePostingFromUser;
    employerModel.searchByUsername = searchByUsername;


    module.exports = employerModel;

    function searchByUsername(keyword) {
        return employerModel.find({"username": new RegExp(keyword, 'i')});
    }

    function deletePostingFromUser(userId, postingId) {
        return employerModel
            .findById(userId)
            .then(function (user) {
                var index = user.postings.indexOf(postingId);
                user.postings.splice(index, 1);
                return user.save();
            });
    }

    function addPostingToUser(userId, postingId) {
        return employerModel
            .findById(userId)
            .then(function (user) {
                user.postings.push(postingId);
                return user.save();
            });
    }

    function createUser(user) {
        return employerModel.create(user);
    }

    function findUserById(userId) {
        return employerModel.findById(userId);
    }

    function findAllUsers() {
        return employerModel.find();
    }

    function findUserByUsername(username) {
        return employerModel.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return employerModel.findOne({username: username, password: password});
    }

    function updateUser(userId, newUser) {
        delete newUser.username;
        delete newUser.password;
        return employerModel.update({_id: userId}, {$set: newUser});
    }

    function deleteUser(userId) {
        return employerModel.remove({_id: userId});
    }
};