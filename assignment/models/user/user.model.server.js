var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('AssignmentUserModel', userSchema);

var api = {
    createUser : createUser,
    findUserById : findUserById,
    findAllUsers : findAllUsers,
    findUserByUsername : findUserByUsername,
    findUserByCredentials : findUserByCredentials,
    updateUser : updateUser,
    deleteUser : deleteUser,
    addWebsiteToUser : addWebsiteToUser,
    deleteWebsiteFromUser : deleteWebsiteFromUser
};
return api;

// userModel.createUser = createUser;
// userModel.findUserById = findUserById;
// userModel.findAllUsers = findAllUsers;
// userModel.findUserByUsername = findUserByUsername;
// userModel.findUserByCredentials = findUserByCredentials;
// userModel.updateUser = updateUser;
// userModel.deleteUser = deleteUser;
// userModel.addWebsiteToUser = addWebsiteToUser;
// userModel.deleteWebsiteFromUser = deleteWebsiteFromUser;

module.exports = userModel;

function deleteWebsiteFromUser(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function addWebsiteToUser(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}