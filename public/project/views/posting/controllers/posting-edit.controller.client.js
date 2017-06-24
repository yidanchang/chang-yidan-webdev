(function () {
    angular
        .module('JobApp')
        .controller('postingEditController', postingEditController);

    function postingEditController($routeParams,
                                   $location,
                                   currentUser,
                                   employerService,
                                   postingService) {
        var model = this;

        model.userId = currentUser._id;
        model.postingId = $routeParams.postingId;
        model.deletePosting = deletePosting;
        model.updatePosting = updatePosting;
        model.logout = logout;

        function init() {
            postingService
                .findAllPostingsForUser(model.userId)
                .then(renderPostings);

            postingService
                .findPostingById(model.postingId)
                .then(renderPosting)
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

        function renderPosting(posting) {
            model.posting2 = posting;
        }

        function logout() {
            employerService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function deletePosting(userId, postingId) {
            postingService
                .deletePosting(userId, postingId)
                .then(function () {
                    $location.url('/posting');
                })
        }

        function updatePosting(postingId, posting) {
            if (typeof posting === 'undefined' || posting.name === null || posting.name === '' || typeof posting.job_title === 'undefined') {
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