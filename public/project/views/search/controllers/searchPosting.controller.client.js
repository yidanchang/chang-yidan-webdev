(function() {
    angular
        .module("JobApp")
        .controller("searchPostingController", searchPostingController);

    function searchPostingController(currentUser, postingService) {
        var model = this;

        model.userId = currentUser._id;
        model.searchByName = searchByName;
        model.findPostingById = findPostingById;
        // model.keyword = $routeParams.keyword;

        function searchByName(keyword) {
            if (typeof keyword === 'undefined' || keyword === '' || keyword === null) {
                model.error = "Search content cannot be empty!";
                return;
            }
            postingService.searchByName(keyword).then(function (response) {
                model.result = response.data;
                if (model.result.length === 0) {
                    model.error = 'Not found any related postings!';
                }
            });
        }

        function findPostingById(postingId) {
            postingService.findPostingById(postingId).then(function (posting) {
                model.posting = posting;
            })
        }
    }
})();
