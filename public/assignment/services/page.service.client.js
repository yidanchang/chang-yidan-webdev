
(function () {
    angular
        .module('WebAppMaker')
        .service('pageService', pageService);

    function pageService() {
        this.findPagesByWebsiteId = findPagesByWebsiteId;
        this.findPageById = findPageById;
        this.deletePage = deletePage;
        this.createPage = createPage;
        this.updatePage= updatePage;

        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "title": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "title": "Lorem" }
        ];


        function updatePage(pageId, page) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages[p] = page;
                }
            }
        }

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }

        function findPagesByWebsiteId(websiteId) {
            var results = [];

            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    pages[p].created = new Date();
                    pages[p].accessed = new Date();
                    results.push(pages[p]);
                }
            }

            return results;
        }
    }
})();