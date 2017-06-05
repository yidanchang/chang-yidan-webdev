(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  $location,
                                  websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;


        function init() {
            // model.websites = websiteService.findWebsitesByUser(model.userId);
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function createWebsite(website) {
            if (typeof website === 'undefined') {
                model.error = "Fail to create! Both 'Name' and 'Description' cannot be empty";
            }

            websiteService
                .createWebsite(model.userId, website)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website");
                })

            // if (typeof website === 'undefined') {
            //     model.error = "Fail to create! Both 'Name' and 'Description' cannot be empty";
            // } else {
            //     website.developerId = model.userId;
            //     websiteService.createWebsite(website);
            //     $location.url('/user/'+model.userId+'/website');
            // }
        }

    }
})();