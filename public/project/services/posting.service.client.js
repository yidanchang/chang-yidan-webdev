(function () {
    angular
        .module('JobApp')
        .service('postingService', postingService);

    function postingService($http) {
        var api = {
            createPosting : createPosting,
            findAllPostingsForUser : findAllPostingsForUser,
            deletePosting : deletePosting,
            updatePosting : updatePosting,
            findPostingById : findPostingById,
            searchByName : searchByName
        };
        return api;

        function searchByName(keyword) {
            var url = "/api/project/search/posting/" + keyword;
            return $http.get(url);
        }

        function createPosting(userId, posting) {
            posting._employer = userId;
            var url = "/api/project/user/" + userId + "/posting";
            return $http.post(url, posting)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPostingById(postingId) {
            var url = "/api/project/posting/" + postingId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePosting(postingId, posting) {
            var url = "/api/project/posting/" + postingId;
            return $http.put(url, posting)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePosting(userId, postingId) {
            var url = "/api/project/user/" + userId + "/posting/" + postingId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPostingsForUser(userId) {
            var url = "/api/project/user/" + userId + "/posting";
            return $http.get(url)
                .then(function (response) {
                    console.log("client");
                    return response.data;
                });
        }

    }
})();