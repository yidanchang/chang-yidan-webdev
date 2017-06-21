(function () {
    angular
        .module('JobApp')
        .controller('postingListController', postingListController);

    function postingListController($routeParams,
                                   currentUser,
                                   postingService) {
        var model = this;

        model.userId = currentUser._id;
        // model.userId = $routeParams['userId'];
        // model.findPostingById = findPostingById;

        function init() {
            postingService
                .findAllPostingsForUser(model.userId)
                .then(renderPostings);
        }
        init();

        function renderPostings(postings) {
            model.postings = postings;
        }

        // function renderPosting(posting) {
        //     model.posting = posting;
        // }

        // function findPostingById(postingId) {
        //     postingService
        //         .findPostingById(postingId)
        //         .then(renderPosting);
        // }
    }
})();