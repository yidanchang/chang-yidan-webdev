(function () {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);

    function pageListController($routeParams,
                                pageService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            model.pages = pageService.findpagesByWebsiteId(model.websiteId);
        }
        init();
    }
})();