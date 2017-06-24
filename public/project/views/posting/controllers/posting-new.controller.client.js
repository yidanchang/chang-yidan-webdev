(function () {
    angular
        .module('JobApp')
        .controller('postingNewController', postingNewController);

    function postingNewController($location,
                                  currentUser,
                                  postingService) {
        var model = this;
        model.userId = currentUser._id;
        model.createPosting = createPosting;
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

        function createPosting(posting) {
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
                .createPosting(model.userId, posting)
                .then(function () {
                    $location.url("/posting");
                })
        }

    }
})();