(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                                $location,
                                pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams.pageId;
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
            model.page2 = {
                _id: model.page._id,
                name: model.page.name,
                websiteId: model.page.websiteId,
                title: model.page.title
            };
        }
        init();

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/' + model.userId +'/website/' + model.websiteId + '/page');
        }

        function updatePage(pageId, page) {
            pageService.updatePage(pageId, page);
            $location.url('/user/' + model.userId +'/website/' + model.websiteId + '/page');
        }
    }

})();