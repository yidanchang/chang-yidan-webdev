// (function(){
//     angular
//         .module('JobApp')
//         .factory('indeedService', indeedService);
//
//     function indeedService($http) {
//         var api = {
//             searchJob : searchJob
//         };
//         return api;
//
//         function searchJob(field, location, country) {
//             if (field === "") && (location  "") && (country !== "") {
//                 var url = "http://api.indeed.com/ads/apisearch?publisher=9954334827924258&v=2&q=" + field;
//             }
//             return $http.get(url)
//                 .then(function (response) {
//                     return response.data;
//                 });
//         }
//
//         function searchJobByLocation(location) {
//             var url = "http://api.indeed.com/ads/apisearch?publisher=9954334827924258&v=2&l=" + location;
//             return $http.get(url)
//                 .then(function (response) {
//                     return response.data;
//                 });
//         }
//
//         function searchJobByCountry(country) {
//             var url = "http://api.indeed.com/ads/apisearch?publisher=9954334827924258&v=2&=co" + country;
//             return $http.get(url)
//                 .then(function (response) {
//                     return response.data;
//                 });
//         }
//     }
// })();