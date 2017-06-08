// var q = require('q');
// const app = require('../../express');
// const https = require('https');
// const querystring = require('querystring');
// app.get('/api.indeed.com/ads/apisearch?publisher=9954334827924258&v=2&q=title&l=location&co=country');
// )
//

(function () {
    angular
        .module('JobApp', [])
        .controller('indeedController', indeedController);

    function indeedController($http, $sce) {

        var model = this;
        model.hello = "Hello";

        model.searchJobs = searchJobs;
        model.searchJobDetails = searchJobDetails;

        function searchJobs(title, location, country) {
            if (typeof title === 'undefined') {
                title = "";
            }
            if (typeof location === 'undefined') {
                location = "";
            }
            if (typeof country === 'undefined') {
                country = "";
            }
            var url = "http://api.indeed.com/ads/apisearch?publisher=9954334827924258&v=2&format=json&q=" + title + "&l=" + location + "&co=" + country;

            $http.get($sce.trustAsResourceUrl(url))
                .then(function (response) {
                    console.log(response.data.results);
                    model.jobs = response.data.results;
                })
            // $http.jsonp($sce.trustAsResourceUrl(url))
            //     .then(function (response) {
            //         console.log(response);
            //         // return response.data;
            //
            //     })
        }

        function searchJobDetails(jobID) {
            var url = " http://api.indeed.com/ads/apigetjobs?publisher=9954334827924258&format=json&v=2&jobkeys=" + jobID;
            $http.get($sce.trustAsResourceUrl(url))
                .then(function (response) {
                    console.log(response.data.results);
                    model.job = response.data.results[0];
                });
        }
    }
}());