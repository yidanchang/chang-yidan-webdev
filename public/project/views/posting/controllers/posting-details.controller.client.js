(function () {
    angular
        .module('JobApp')
        .controller('postingDetailsController', postingDetailsController);

    function postingDetailsController($routeParams,
                                   currentUser,
                                   $location,
                                   postingService) {
        var model = this;

        model.userId = currentUser._id;
        // model.userId = $routeParams['userId'];
        model.postingId = $routeParams['postingId'];

        function init() {
            postingService
                .getPosting(model.postingId)
                .then(function (posting) {
                    model.posting = posting;
                    $location.url('/posting/' + model.postingId + '/details')
                });
        }
        init();

    }
})();