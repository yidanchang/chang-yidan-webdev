// (function() {
//     angular
//         .module("JobApp")
//         .controller("SearchJobController", SearchJobController);
//
//     function SearchJobController(currentUser, postingService) {
//         var model = this;
//
//         model.userId = currentUser._id;
//
//         model.searchUser = searchUser;
//
//         function searchUser() {
//             postingService
//                 .findPostingById(postingId)
//                 .then(function (response) {
//                     model.posting = response.data;
//                 })
//
//         }
//
//     }
// }();