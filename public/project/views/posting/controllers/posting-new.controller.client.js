(function () {
    angular
        .module('JobApp')
        .controller('postingNewController', postingNewController);

    function postingNewController($routeParams,
                                  $location,
                                  currentUser,
                                  postingService) {
        var model = this;
        model.userId = currentUser._id;
        // model.userId = $routeParams['userId'];
        model.createPosting = createPosting;


        function init() {
            // model.websites = postingService.findWebsitesByUser(model.userId);
            postingService
                .findAllPostingsForUser(model.userId)
                .then(renderPostings);
        }
        init();

        function renderPostings(postings) {
            model.postings = postings;
        }

        function createPosting(posting) {
            if(typeof posting === 'undefined' || posting.name === null || posting.name === '' || typeof posting.job_title === 'undefined') {
                model.error = 'Job title of Posting is required';
                return;
            }
            if (typeof posting.company === 'undefined' || posting.company === null || posting.company === '') {
                model.error = 'Company of Posting is required';
                return;
            }
            if (typeof posting.description === 'undefined' || posting.description === null || posting.description === '') {
                model.error = 'Description of Posting is required';
                return;
            }
            postingService
                .createPosting(model.userId, posting)
                .then(function () {
                    $location.url("/posting");
                })
        }

    }
})();