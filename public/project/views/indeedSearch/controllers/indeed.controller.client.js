
(function () {
    angular
        .module('JobApp', [])
        .controller('indeedController', indeedController);

    function indeedController($http, $sce, $scope) {

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
            var url = "http://api.indeed.com/ads/apisearch?format=json&publisher=9954334827924258&v=2&q=" + title + "&l=" + location + "&co=" + country;

            $.ajax({
                url: url,
                type: "GET",
                dataType: 'jsonp',
                cache: true,
                success: function (data, status, error) {
                    //console.log('success', data);
                    //console.log(data.results);
                    model.jobs = data.results;
                    $scope.$apply();
                    console.log(url);
                },
                error: function (data, status, error) {
                    console.log('error', data, status, error);
                    console.log(url);
                }
            });


            // $http.jsonp($sce.trustAsResourceUrl(url),{jsonpCallbackParam: 'callback'})
            //     .then(function (response) {
            //         console.log(response.data.results);
            //         model.jobs = response.data.results;
            //     })
            // $http.get(url).then(function (found) {
            //     console.log(found);
            // })
        }

        // function something(data) {
        //     console.log(data);
        // }

        function searchJobDetails(jobID) {
            var url = "http://api.indeed.com/ads/apigetjobs?publisher=9954334827924258&format=json&v=2&jobkeys=" + jobID;
            $.ajax({
                url: url,
                type: "GET",
                dataType: 'jsonp',
                cache: true,
                success: function (data, status, error) {
                    //console.log('success', data);
                    model.job = data.results[0];
                    $scope.$apply();
                },
                error: function (data, status, error) {
                    console.log('error', data, status, error);
                }
            });
            // $http.get($sce.trustAsResourceUrl(url))
            //     .then(function (response) {
            //         console.log(response.data.results);
            //         model.job = response.data.results[0];
            //     });
        }
    }
}());