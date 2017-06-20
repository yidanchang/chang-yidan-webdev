// (function () {
//     angular
//         .module('WebAppMaker')
//         .controller('websiteNewController', websiteNewController);
//
//     function websiteNewController($routeParams,
//                                   $location,
//                                   currentUser,
//                                   websiteService) {
//         var model = this;
//         model.userId = currentUser._id;
//         // model.userId = $routeParams['userId'];
//         model.createWebsite = createWebsite;
//
//
//         function init() {
//             // model.websites = websiteService.findWebsitesByUser(model.userId);
//             websiteService
//                 .findAllWebsitesForUser(model.userId)
//                 .then(renderWebsites);
//         }
//         init();
//
//         function renderWebsites(websites) {
//             model.websites = websites;
//         }
//
//         function createWebsite(website) {
//             if(typeof website === 'undefined' || website.name === null || website.name === '' || typeof website.name === 'undefined') {
//                 model.error = 'Website name is required';
//                 return;
//             }
//             // if (typeof website === 'undefined') {
//             //     model.error = "Fail to create! 'Name' and 'Description' cannot be empty";
//             // }
//
//             websiteService
//                 .createWebsite(model.userId, website)
//                 .then(function () {
//                     $location.url("/website");
//                 })
//
//             // if (typeof website === 'undefined') {
//             //     model.error = "Fail to create! Both 'Name' and 'Description' cannot be empty";
//             // } else {
//             //     website.developerId = model.userId;
//             //     websiteService.createWebsite(website);
//             //     $location.url('/user/'+model.userId+'/website');
//             // }
//         }
//
//     }
// })();