(function () {
    angular
        .module('JobApp')
        .controller('postingDetailsController', postingDetailsController);

    function postingDetailsController($routeParams,
                                      currentUser,
                                      $location,
                                      postingService,
                                      employerService) {
        var model = this;

        model.userId = currentUser._id;
        model.postingId = $routeParams['postingId'];
        model.logout = logout;

        function init() {
            postingService
                .getPosting(model.postingId)
                .then(function (posting) {
                    model.posting = posting;
                    employerService.findUserById(posting._employer).then(function (employer) {
                        model.posting.username = employer.username;
                    });
                    $location.url('/posting/' + model.postingId + '/details')
                });
        }

        init();

        function logout() {
            employerService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

    }
})();