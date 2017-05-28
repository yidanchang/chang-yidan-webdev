(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                               $location,
                               pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
        }
        init();

        function createPage(websiteId, page) {
            if (typeof page === 'undefined') {
                model.error = "Fail to create! Both 'Name' and 'Title' cannot be empty";
            } else {
                page.websiterId = websiteId;
                pageService.createPage(websiteId, page);
                $location.url('/user/' + model.userId +'/website/' + model.websiteId + '/page');
            }
        }
    }
})();