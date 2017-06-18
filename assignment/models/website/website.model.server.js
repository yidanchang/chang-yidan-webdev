// var mongoose = require('mongoose');
module.exports = function (mongoose) {

    var websiteSchema = require('./website.schema.server');
    var websiteModel = mongoose.model('AssignmentWebsiteModel', websiteSchema);
    var userModel = require('../user/user.model.server');

// api
// websiteModel.findAllWebsites = findAllWebsites;
    websiteModel.createWebsiteForUser = createWebsiteForUser;
    websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
    websiteModel.deleteWebsiteFromUser = deleteWebsiteFromUser;
    websiteModel.updateWebsite = updateWebsite;
// websiteModel.deleteWebsite = deleteWebsite;
    websiteModel.findWebsiteById = findWebsiteById;
    websiteModel.addPageToWebsite = addPageToWebsite;
    websiteModel.deletePagesFromWebsite = deletePagesFromWebsite;

    module.exports = websiteModel;

    function deletePagesFromWebsite(websiteId, pageId) {
        return websiteModel
            .findById(websiteId)
            .then(function (website) {
                var index = website.pages.indexOf(pageId);
                website.pages.splice(index, 1);
                return website.save();
            });
    }

    function addPageToWebsite(websiteId, pageId) {
        return websiteModel
            .findById(websiteId)
            .then(function (website) {
                website.pages.push(pageId);
                return website.save();
            });
    }

    function updateWebsite(websiteId, website) {
        return websiteModel
            .update({_id: websiteId},
                {
                    name: website.name,
                    description: website.description
                });
    }

// function deleteWebsite(websiteId) {
//     return websiteModel
//         .remove({_id: websiteId});
// }

    function deleteWebsiteFromUser(userId, websiteId) {
        return websiteModel
            .remove({_id: websiteId})
            .then(function (status) {
                return userModel
                    .deleteWebsiteFromUser(userId, websiteId);
            });
    }

    function findAllWebsitesForUser(userId) {
        return websiteModel
            .find({_user: userId})
            .populate('_user')
            .exec();
    }

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        // return websiteModel
        //     .create(website);
        return websiteModel
            .create(website)
            .then(function (website) {
                userModel.addWebsiteToUser(userId, website._id);
                return website;
            })
    }

// function findAllWebsites() {
//     return websiteModel.find();
// }

    function findWebsiteById(websiteId) {
        return websiteModel
            .findById(websiteId);
    }
}