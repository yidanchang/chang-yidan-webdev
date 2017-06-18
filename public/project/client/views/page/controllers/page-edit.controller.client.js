(function () {
    angular
        .module('JobApp')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                                $location,
                                currentUser,
                                pageService) {
        var model = this;

        // model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams.pageId;
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init() {
            // model.websites = websiteService.findWebsitesByUser(model.userId);
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(renderPages);

            pageService
                .findPageById(model.pageId)
                .then(renderPage);
        }
        init();

        function renderPages(pages) {
            model.pages = pages;
        }

        function renderPage(page) {
            model.page2 = page;
        }

        function deletePage(websiteId, pageId) {
            pageService
                .deletePage(websiteId, pageId)
                .then(function () {
                    $location.url('/website/' + websiteId + '/page');
                })
        }

        function updatePage(pageId, page) {
            if(typeof page === 'undefined' || page.name === null || page.name === '' || typeof page.name === 'undefined') {
                model.error = 'Page name is required';
                return;
            }
            pageService
                .updatePage(pageId, page)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page');
                })
        }
    }
})();