(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams,
                                 $location,
                                 widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams.pageId;
        model.createWidget = createWidget;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function createWidget(widgetType) {
            var newId = widgetType.toString() + (new Date()).getTime() + "";
            var newWidget = {
                _id: newId,
                widgetType: widgetType,
                pageId: model.pageId
            };
            // For default heading size
            if (widgetType === 'HEADING') {
                newWidget.size = 1;
            }
            widgetService.createWidget(model.pageId, newWidget);
            $location.url('/user/' + model.userId +'/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + newId);
        }
    }
})();