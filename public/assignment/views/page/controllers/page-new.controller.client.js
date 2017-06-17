(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                               $location,
                               currentUser,
                               pageService) {
        var model = this;

        // model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
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
            if(typeof page === 'undefined' || page.name === null || page.name === '' || typeof page.name === 'undefined') {
                model.error = 'Page name is required';
                return;
            }
            // if (typeof page === 'undefined') {
            //     model.error = "Fail to create! Both 'Name' and 'Title' cannot be empty";
            // }
            pageService.createPage(model.websiteId, page)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page');
                })
        }
    }
})();