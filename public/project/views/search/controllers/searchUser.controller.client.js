(function() {
    angular
        .module("JobApp")
        .controller("searchUserController", searchUserController);

    function searchUserController(currentUser, employerService) {
        var model = this;

        model.userId = currentUser._id;
        model.searchByUsername = searchByUsername;
        // model.keyword = $routeParams.keyword;

        function searchByUsername(keyword) {
            if (typeof keyword === 'undefined' || keyword === '' || keyword === null) {
                model.error = "Search content cannot be empty!";
                return;
            }
            employerService.searchByUsername(keyword).then(function (response) {
                console.log(response);
                model.result = response;
                if (model.result.length === 0) {
                    model.error = 'Not found any related users!';
                }
            });
        }
    }
})();
