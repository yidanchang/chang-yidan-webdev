// (function () {
//     angular
//         .module('JobApp')
//         .service('postingService', postingService);
//
//     function postingService($http) {
//         var api = {
//             createPostingForEmployer : createPostingForEmployer,
//             findAllPostingsForEmployer : findAllPostingsForEmployer,
//             deletePosting : deletePosting,
//             updatePosting : updatePosting,
//             findPostingById : findPostingById,
//             searchJobs : searchJobs
//         };
//         return api;
//
//         function createPostingForEmployer(employerId, posting) {
//             posting._employer = employerId;
//             var url = "/api/project/employer/" + employerId + "/posting";
//             return $http.post(url, posting)
//                 .then(function (response) {
//                     return response.data;
//                 });
//         }
//
//         function findPostingById(postingId) {
//             var url = "/api/project/posting/" + postingId;
//             return $http.get(url)
//                 .then(function (response) {
//                     return response.data;
//                 });
//         }
//
//         function updatePosting(postingId, posting) {
//             var url = "/api/project/posting/" + postingId;
//             return $http.put(url, posting)
//                 .then(function (response) {
//                     return response.data;
//                 });
//         }
//
//         function deletePosting(employerId, postingId) {
//             var url = "/api/project/employer/" + employerId + "/posting/" + postingId;
//             return $http.delete(url)
//                 .then(function (response) {
//                     return response.data;
//                 });
//         }
//
//         function findAllPostingsForEmployer(employerId) {
//             var url = "/api/project/employer/" + employerId + "/posting";
//             return $http.get(url)
//                 .then(function (response) {
//                     return response.data;
//                 });
//         }
//
//         function searchJobs(location, field) {
//             var url = "/api/project/search/location/" + location + "/field/" + field;
//             return $http.post(url)
//                 .then(function (response) {
//
//                 })
//         }
//     }
// })();