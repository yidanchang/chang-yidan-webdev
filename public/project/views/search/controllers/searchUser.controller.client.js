(function() {
    angular
        .module("JobApp")
        .controller("SearchUserController", SearchUserController);

    function SearchUserController(currentUser, $routeParams, $location, employerService) {
        var model = this;

        model.userId = currentUser._id;
        model.searchUser = searchUser;
        model.keyword = $routeParams.keyword;

        function init() {
            employerService
                .searchByUsername(model.keyword)
                .then(function (response) {
                    model.result = response.data;
                    }, function (err) {
                    model.error = "Sorry, not found related users for you!";
                });
        }

        init();

        function searchUser() {
            if (model.keyword.length > 0) {
                $location.url("/search/user/" + model.keyword);
            }
        }
    }
})();
