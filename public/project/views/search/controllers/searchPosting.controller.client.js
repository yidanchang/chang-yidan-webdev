(function() {
    angular
        .module("JobApp")
        .controller("searchPostingController", searchPostingController);

    function searchPostingController(currentUser, $routeParams, $location, postingService, employerService) {
        var model = this;

        model.userId = $routeParams['userId'];
        if(!model.userId) {
            model.userId = currentUser._id;
            model.myPosts = true;
        }

        model.searchByName = searchByName;
        model.findPostingById = findPostingById;
        model.logout = logout;

        function logout() {
            employerService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function searchByName(keyword) {
            if (typeof keyword === 'undefined' || keyword === '' || keyword === null) {
                model.error = "Search content cannot be empty!";
                model.result = null;
                return;
            }
            postingService.searchByName(keyword).then(function (response) {
                model.error = null;
                model.result = response.data;
                if (model.result.length === 0) {
                    model.error = 'Not found any related postings!';
                    model.result = null;
                }
            });
        }

        function findPostingById(postingId) {
            postingService.findPostingById(postingId).then(function (posting) {
                model.posting = posting;
                employerService.findUserById(posting._employer).then(function (employer) {
                    if (employer === null) {
                        model.posting.username = null;
                    } else {
                        model.posting.username = employer.username;
                    }
                });
            })
        }
    }
})();
