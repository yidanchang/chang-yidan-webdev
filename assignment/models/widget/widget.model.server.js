// var mongoose = require('mongoose');
module.exports = function (mongoose) {

    var widgetSchema = require('./widget.schema.server');
    var widgetModel = mongoose.model('AssignmentWidgetModel', widgetSchema);
    var pageModel = require('../page/page.model.server');

// api
    widgetModel.createWidget = createWidget;
    widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
    widgetModel.updateWidget = updateWidget;
    widgetModel.findWidgetById = findWidgetById;
    widgetModel.deleteWidgetsFromPage = deleteWidgetsFromPage;
    widgetModel.reorderWidget = reorderWidget;

    module.exports = widgetModel;

    function reorderWidget(pageId, startIndex, endIndex) {
        return pageModel
            .reorderWidget(pageId, startIndex, endIndex);
    }

    function updateWidget(widgetId, widget) {
        return widgetModel
            .update({_id: widgetId},
                {$set: widget});
    }

// function deletePage(pageId) {
//     return pageModel
//         .remove({_id: pageId});
// }

    function deleteWidgetsFromPage(pageId, widgetId) {
        return widgetModel
            .remove({_id: widgetId})
            .then(function (status) {
                return pageModel
                    .deleteWidgetsFromPage(pageId, widgetId);
            });
    }

    function findAllWidgetsForPage(pageId) {
        return pageModel
            .findPageById(pageId)
            .then(function (page) {
                var widgetsId = page.widgets;
                return widgetModel.find({_id: {$in: widgetsId}}).exec(function (err, docs) {
                    // console.log(docs);
                    docs.sort(function (a, b) {
                        // console.log(docs);
                        // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
                        return widgetsId.indexOf(a._id) - widgetsId.indexOf(b._id);
                    });
                });
            });
        // return widgetModel
        //     .find({_page: pageId})
        //     .populate('_page')
        //     .exec();
    }

    function createWidget(pageId, widget) {
        widget._page = pageId;
        // return widgetModel
        //     .create(widget);
        return widgetModel
            .create(widget)
            .then(function (widget) {
                pageModel.addWidgetToPage(pageId, widget._id);
                return widget;
            })
    }

// function findAllWebsites() {
//     return websiteModel.find();
// }

    function findWidgetById(widgetId) {
        return widgetModel
            .findById(widgetId);
    }
}