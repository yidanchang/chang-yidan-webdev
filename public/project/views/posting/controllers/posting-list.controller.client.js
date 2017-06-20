// (function () {
//     angular
//         .module('WebAppMaker')
//         .controller('websiteListController', websiteListController);
//
//     function websiteListController($routeParams,
//                                    currentUser,
//                                    websiteService) {
//         var model = this;
//
//         model.userId = currentUser._id;
//         // model.userId = $routeParams['userId'];
//
//         function init() {
//             // model.websites = websiteService.findAllWebsitesForUser(model.userId);
//             websiteService
//                 .findAllWebsitesForUser(model.userId)
//                 .then(renderWebsites);
//         }
//         init();
//
//         function renderWebsites(websites) {
//             model.websites = websites;
//         }
//     }
// })();