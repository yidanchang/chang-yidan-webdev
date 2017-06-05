(function () {
    angular
        .module('WebAppMaker')
        .service('widgetService', widgetService);

    function widgetService($http) {
        var api = {
            findAllWidgetsForPage: findAllWidgetsForPage,
            findWidgetById: findWidgetById,
            deleteWidget: deleteWidget,
            createWidget: createWidget,
            updateWidget: updateWidget
            //sortWidget: sortWidget
        };
        return api;

        // function sortWidget(pageId, index1, index2){
        //     var url = "/api/assignment/page/" + pageId + "/widget/?intial=" + index1 +"&final=" + index2;
        //     $http.put(url)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }

        function createWidget(pageId, widget) {
            //widget.pageId = pageId;
            var url = "/api/assignment/page/" + pageId + "/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWidgetsForPage(pageId) {
            var url = "/api/assignment/page/" + pageId + "/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();