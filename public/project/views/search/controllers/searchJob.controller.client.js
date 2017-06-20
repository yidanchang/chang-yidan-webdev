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
//         model.searchJobs = searchJobs;
//         model.findPostingById = findPostingById;
//
//         function searchJobs(location, field) {
//             if (location === null || location === '' || typeof location === 'undefined') {
//                 model.error = 'Location cannot be empty!';
//                 return;
//             }
//             if (field === null || field === '' || typeof field === 'undefined') {
//                 model.error = 'Field cannot be empty!';
//                 return;
//             }
//             var searchObj = {
//                 location: location,
//                 field: field
//             };
//             postingService
//                 .searchJobs(searchObj)
//                 .then(function (response) {
//                         model.postings = response.data;
//                     }, function (error) {
//                         model.error = error.data;
//                     });
//         }
//
//         function findPostingById(postingId) {
//             postingService
//                 .findPostingById(postingId)
//                 .then(function (response) {
//                     model.posting = response.data;
//                 });
//
//         }
//     }
// }();