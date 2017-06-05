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
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(renderPages);
        }
        init();

        function renderPages(pages) {
            model.pages = pages;
        }

        function createPage(page) {
            if (typeof page === 'undefined') {
                model.error = "Fail to create! Both 'Name' and 'Title' cannot be empty";
            }
            pageService.createPage(model.websiteId, page)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                })
        }
    }
})();