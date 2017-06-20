// (function () {
//     angular
//         .module('WebAppMaker')
//         .controller('websiteEditController', websiteEditController);
//
//     function websiteEditController($routeParams,
//                                    $location,
//                                    currentUser,
//                                    websiteService) {
//         var model = this;
//
//         // model.userId = $routeParams['userId'];
//         model.userId = currentUser._id;
//         model.websiteId = $routeParams.websiteId;
//         model.deleteWebsite = deleteWebsite;
//         model.updateWebsite = updateWebsite;
//
//         function init() {
//             // model.websites = websiteService.findWebsitesByUser(model.userId);
//             websiteService
//                 .findAllWebsitesForUser(model.userId)
//                 .then(renderWebsites);
//
//             websiteService
//                 .findWebsiteById(model.websiteId)
//                 .then(renderWebsite);
//         }
//         init();
//
//         function renderWebsites(websites) {
//             model.websites = websites;
//         }
//
//         function renderWebsite(website) {
//             model.website2 = website;
//         }
//
//
//         function deleteWebsite(userId, websiteId) {
//             websiteService
//                 .deleteWebsite(userId, websiteId)
//                 .then(function () {
//                     $location.url('/website');
//                 })
//         }
//
//         function updateWebsite(websiteId, website) {
//             // model.website2 = {
//             //     _id: model.website._id,
//             //     name: model.website.name,
//             //     developerId: model.website.developerId,
//             //     description: model.website.description
//             // };
//             if(typeof website === 'undefined' || website.name === null || website.name === '' || typeof website.name === 'undefined') {
//                 model.error = 'Website name is required';
//                 return;
//             }
//             websiteService
//                 .updateWebsite(websiteId, website)
//                 .then(function () {
//                     $location.url('/website');
//                 })
//         }
//     }
//
// })();