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
    employerModel.findAllFollowings = findAllFollowings;
    employerModel.findAllFollowers = findAllFollowers;


    module.exports = employerModel;

    function findAllFollowings(following) {
        return employerModel.find({_id: {$in: following}});
    }

    function findAllFollowers(follower) {
        return employerModel.find({_id: {$in: follower}});
    }

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
        user.roles = ['USER'];
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
        return employerModel.update({_id: userId}, {$set: newUser});
    }

    function deleteUser(userId) {
        return employerModel.remove({_id: userId});
    }
};