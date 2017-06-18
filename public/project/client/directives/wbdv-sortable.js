(function () {
    angular
        .module('wbdvDirectives', [])
        .directive('wdDraggable', wdDraggable);

    function wdDraggable() {

        function linkFunction(scope, element) {
            var baseURI = element[0].baseURI;
            var pageId = baseURI.split("#")[1].split("/")[6];
            $(element).sortable();

            $(element).on('sortdeactivate', function(event, ui) {
                var initial = angular.element(ui.item).scope().$index;
                var final = element.children().index(ui.item);
                scope.$emit('fromTo', {pageId: pageId, initial: initial, final: final});
            })
        }

        return {
            link: linkFunction
        }
    }
})();