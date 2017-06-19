// var mongoose = require('mongoose');
module.exports = function (mongoose) {

    var hunterSchema = require('./hunter.schema.server');
    var hunterModel = mongoose.model('ProjectHunterModel', hunterSchema);

    hunterModel.createHunter = createHunter;
    hunterModel.findUserById = findUserById;
    hunterModel.findAllUsers = findAllUsers;
    hunterModel.findUserByUsername = findUserByUsername;
    hunterModel.findUserByCredentials = findUserByCredentials;
    hunterModel.updateUser = updateUser;
    hunterModel.deleteUser = deleteUser;
    hunterModel.addApplicationToHunter = addApplicationToHunter;
    hunterModel.deleteApplicationFromHunter = deleteApplicationFromHunter;
    hunterModel.findUserByFacebookId = findUserByFacebookId;

    module.exports = hunterModel;

    function findUserByFacebookId(facebookId) {
        return hunterModel.findOne({'facebook.id': facebookId});
    }


    function deleteApplicationFromHunter(hunterId, applicationId) {
        return hunterModel
            .findById(hunterId)
            .then(function (hunter) {
                var index = hunter.applications.indexOf(applicationId);
                hunter.applications.splice(index, 1);
                return hunter.save();
            });
    }

    function addApplicationToHunter(hunterId, applicationId) {
        return hunterModel
            .findById(hunterId)
            .then(function (hunter) {
                hunter.postings.push(applicationId);
                return hunter.save();
            });
    }

    function createHunter(hunter) {
        return hunterModel.create(hunter);
    }

    function findUserById(hunterId) {
        return hunterModel.findById(hunterId);
    }

    function findAllUsers() {
        return hunterModel.find();
    }

    function findUserByUsername(username) {
        return hunterModel.findOne({hunter_username: username});
    }

    function findUserByCredentials(username, password) {
        return hunterModel.findOne({hunter_username: username, password: password});
    }

    function updateUser(hunterId, newhunter) {
        delete newhunter.hunter_username;
        delete newhunter.password;
        return hunterModel.update({_id: hunterId}, {$set: newhunter});
    }

    function deleteUser(hunterId) {
        return hunterModel.remove({_id: hunterId});
    }
};