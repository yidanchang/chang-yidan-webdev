(function () {
    angular
        .module('WebAppMaker')
        .service('pageService', pageService);

    function pageService() {
        this.findpagesByWebsiteId = findpagesByWebsiteId;
        this.findpageById = findpageById;
        this.deletepage = deletepage;
        this.createpage = createpage;
        this.updatepage= updatepage;

        var pages = [
                { "_id": "321", "name": "Post 1", "pageId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "pageId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "pageId": "456", "description": "Lorem" }
        ];


        function updatepage(pageId, page) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages[p] = page;
                }
            }
        }

        function createpage(websiteid, page) {
            page._id = (new Date()).getTime() + "";
            pages.push(page);
        }

        function deletepage(pageId) {
            var page = findpageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function findpageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }

        function findpagesByWebsiteId(websiteId) {
            var results = [];

            for(var p in pages) {
                if(pages[p].pageId === websiteId) {
                    pages[p].created = new Date();
                    pages[p].accessed = new Date();
                    results.push(pages[p]);
                }
            }

            return results;
        }
    }
})();