(function () {
    angular
        .module('JobApp')
        .controller('postingListController', postingListController);

    function postingListController($routeParams,
                                   currentUser,
                                   $location,
                                   employerService,
                                   postingService) {
        var model = this;

        model.userId = $routeParams['userId'];
        if (!model.userId) {
            model.userId = currentUser._id;
            model.myPosts = true;
        }
        model.logout = logout;

        function init() {
            postingService
                .findAllPostingsForUser(model.userId)
                .then(renderPostings)
                .then(function () {
                    employerService.findUserById(model.userId).then(function (user) {
                        model.postings.username = user.username;
                    })
                });
        }

        init();

        function renderPostings(postings) {
            model.postings = postings;
        }

        function logout() {
            employerService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

    }
})();