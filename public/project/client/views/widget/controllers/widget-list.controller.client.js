(function () {
    angular
        .module('JobApp')
        .controller('widgetListController', widgetListController);

    function widgetListController($routeParams,
                                  widgetService,
                                  currentUser,
                                  $sce,
                                  $scope) {
        var model = this;

        // model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(renderWidgets);
        }
        init();

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        $scope.$on('fromTo', function(event, data) {
            data.pageId = model.pageId;
            widgetService
                .sortWidget(model.pageId, data);
        });

        function widgetUrl(widget) {
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'.view.client.html';
            return url;
        }

        function getYouTubeEmbedUrl(youtubeLinkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var youtubeLinkUrlParts = youtubeLinkUrl.split('/');
            embedUrl += youtubeLinkUrlParts[youtubeLinkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }


    }
})();