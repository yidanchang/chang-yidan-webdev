(function () {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);

    function pageListController($routeParams,
                                currentUser,
                                pageService) {
        var model = this;

        // model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(renderPages);
        }
        init();

        function renderPages(pages) {
            model.pages = pages;
        }
    }
})();