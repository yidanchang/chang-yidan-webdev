(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,
                                  $location,
                                  currentUser,
                                  widgetService) {
        var model = this;

        // model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams.widgetId;
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(renderWidgets);

            widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget);
        }

        init();

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        function renderWidget(widget) {
            model.widget = widget;
        }

        function deleteWidget(pageId, widgetId) {
            widgetService
                .deleteWidget(pageId, widgetId)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page/' + pageId + '/widget');
                })
        }

        function updateWidget(widgetId, widget) {
            if(typeof widget === 'undefined' || widget.name === null || widget.name === '' || typeof widget.name === 'undefined') {
                model.error = 'Widget name is required';
                return;
            }
            widgetService
                .updateWidget(widgetId, widget)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                })
        }
    }
})();