(function () {
    angular
        .module('JobApp')
        .controller('postingEditController', postingEditController);

    function postingEditController($routeParams,
                                   $location,
                                   currentUser,
                                   postingService) {
        var model = this;

        // model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.postingId = $routeParams.postingId;
        model.deletePosting = deletePosting;
        model.updatePosting = updatePosting;

        function init() {
            postingService
                .findAllPostingsForUser(model.userId)
                .then(renderPostings);

            postingService
                .findPostingById(model.postingId)
                .then(renderPosting);
        }
        init();

        function renderPostings(postings) {
            model.postings = postings;
        }

        function renderPosting(posting) {
            model.posting2 = posting;
        }


        function deletePosting(userId, postingId) {
            postingService
                .deletePosting(userId, postingId)
                .then(function () {
                    $location.url('/posting');
                })
        }

        function updatePosting(postingId, posting) {
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
                .updatePosting(postingId, posting)
                .then(function () {
                    $location.url('/posting');
                })
        }
    }

})();