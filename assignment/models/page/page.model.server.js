// var mongoose = require('mongoose');
module.exports = function (mongoose) {
    var pageSchema = require('./page.schema.server');
    var pageModel = mongoose.model('AssignmentPageModel', pageSchema);
    var websiteModel = require('../website/website.model.server');

// api
// websiteModel.findAllWebsites = findAllWebsites;

    pageModel.createPage = createPage;
    pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
// pageModel.deletePage = deletePage;
    pageModel.updatePage = updatePage;
// pageModel.deletePage = deletePage;
    pageModel.findPageById = findPageById;
    pageModel.deletePagesFromWebsite = deletePagesFromWebsite;
    pageModel.deleteWidgetsFromPage = deleteWidgetsFromPage;
    pageModel.addWidgetToPage = addWidgetToPage;
    pageModel.reorderWidget = reorderWidget;

    module.exports = pageModel;

    function reorderWidget(pageId, startIndex, endIndex) {
        return pageModel
            .findById(pageId)
            .then(function (page) {
                page.widgets.splice(endIndex, 0, page.widgets.splice(startIndex, 1)[0]);
                page.markModified('widgets');
                return page.save();
            });
    }

    function deleteWidgetsFromPage(pageId, widgetId) {
        return pageModel
            .findById(pageId)
            .then(function (page) {
                var index = page.widgets.indexOf(widgetId);
                page.widgets.splice(index, 1);
                return page.save();
            });
    }

    function addWidgetToPage(pageId, widgetId) {
        return pageModel
            .findById(pageId)
            .then(function (page) {
                page.widgets.push(widgetId);
                return page.save();
            });
    }

    function updatePage(pageId, page) {
        return pageModel
            .update({_id: pageId},
                {
                    name: page.name,
                    title: page.title
                });
    }

// function deletePage(pageId) {
//     return pageModel
//         .remove({_id: pageId});
// }

    function deletePagesFromWebsite(websiteId, pageId) {
        return pageModel
            .remove({_id: pageId})
            .then(function (status) {
                return websiteModel
                    .deletePagesFromWebsite(websiteId, pageId);
            });
    }

    function findAllPagesForWebsite(websiteId) {
        return pageModel
            .find({_website: websiteId})
            .populate('_website')
            .exec();
    }

    function createPage(websiteId, page) {
        page._website = websiteId;
        // return pageModel
        //     .create(page);
        return pageModel
            .create(page)
            .then(function (page) {
                websiteModel.addPageToWebsite(websiteId, page._id);
                return page;
            })
    }

// function findAllWebsites() {
//     return websiteModel.find();
// }

    function findPageById(pageId) {
        return pageModel
            .findById(pageId);
    }
}