// var mongoose = require('mongoose');
module.exports = function (mongoose) {

    var applicationSchema = require('./application.schema.server');
    var applicationModel = mongoose.model('ProjectApplicationModel', applicationSchema);
    var hunterModel = require('../hunter/hunter.model.server');

    applicationModel.createApplicationForHunter = createApplicationForHunter;
    applicationModel.findAllApplicationsForHunter = findAllApplicationsForHunter;
    applicationModel.deleteApplicationFromHunter = deleteApplicationFromHunter;
    applicationModel.updateApplication = updateApplication;
    applicationModel.findApplicationById = findApplicationById;
    // applicationModel.addPageToapplication = addPageToapplication;
    // applicationModel.deletePagesFromapplication = deletePagesFromapplication;

    module.exports = applicationModel;

    // function deletePagesFromapplication(applicationId, pageId) {
    //     return applicationModel
    //         .findById(applicationId)
    //         .then(function (application) {
    //             var index = application.pages.indexOf(pageId);
    //             application.pages.splice(index, 1);
    //             return application.save();
    //         });
    // }
    //
    // function addPageToapplication(applicationId, pageId) {
    //     return applicationModel
    //         .findById(applicationId)
    //         .then(function (application) {
    //             application.pages.push(pageId);
    //             return application.save();
    //         });
    // }

    function updateApplication(applicationId, application) {
        return applicationModel
            .update({_id: applicationId},
                {
                    name: application.name,
                    description: application.description
                });
    }

    function deleteApplicationFromHunter(hunterId, applicationId) {
        return applicationModel
            .remove({_id: applicationId})
            .then(function (status) {
                return hunterModel
                    .deleteApplicationFromHunter(hunterId, applicationId);
            });
    }

    function findAllApplicationsForHunter(hunterId) {
        return applicationModel
            .find({_hunter: hunterId})
            .populate('_user')
            .exec();
    }

    function createApplicationForHunter(hunterId, application) {
        application._hunter = hunterId;
        // return applicationModel
        //     .create(application);
        return applicationModel
            .create(application)
            .then(function (application) {
                hunterModel.addApplicationToHunter(hunterId, application._id);
                return application;
            })
    }

    function findApplicationById(applicationId) {
        return applicationModel
            .findById(applicationId);
    }
};