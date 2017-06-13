(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            // model.websites = websiteService.findWebsitesByUser(model.userId);
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);

            websiteService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite);
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function renderWebsite(website) {
            model.website2 = website;
        }


        function deleteWebsite(userId, websiteId) {
            websiteService
                .deleteWebsite(userId, websiteId)
                .then(function () {
                    $location.url('/user/' + userId + '/website');
                })
        }

        function updateWebsite(websiteId, website) {
            // model.website2 = {
            //     _id: model.website._id,
            //     name: model.website.name,
            //     developerId: model.website.developerId,
            //     description: model.website.description
            // };
            websiteService
                .updateWebsite(websiteId, website)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website');
                })
        }
    }

})();