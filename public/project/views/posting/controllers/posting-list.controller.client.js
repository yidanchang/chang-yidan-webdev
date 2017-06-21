(function () {
    angular
        .module('JobApp')
        .controller('postingListController', postingListController);

    function postingListController($routeParams,
                                   currentUser,
                                   $location,
                                   postingService) {
        var model = this;

        model.userId = currentUser._id;
        // model.userId = $routeParams['userId'];

        function init() {
            postingService
                .findAllPostingsForUser(model.userId)
                .then(renderPostings);
        }
        init();

        function renderPostings(postings) {
            model.postings = postings;
        }
    }
})();