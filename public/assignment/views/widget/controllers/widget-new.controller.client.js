(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams,
                                 $location,
                                 currentUser,
                                 widgetService) {
        var model = this;

        // model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams.pageId;
        model.createWidget = createWidget;

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(renderWidgets);
        }
        init();

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        function createWidget(widgetType) {
            //var newId = widgetType.toString() + (new Date()).getTime() + "";
            var newWidget = {
                //_id: newId,
                widgetType: widgetType,
                pageId: model.pageId
            };
            // For default heading text and size
            // if (widgetType === 'HEADING') {
            //     newWidget.text = "GIZMODO";
            //     newWidget.size = 1;
            // }
            if (widgetType === 'YOUTUBE') {
                newWidget.url = "";
            }
            widgetService
                .createWidget(model.pageId, newWidget)
                .then(function (widget) {
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                })
        }
    }
})();