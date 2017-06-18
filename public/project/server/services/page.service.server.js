// const app = require('../../express');
module.exports = function (app) {

    var pageModel = require('../models/page/page.model.server');

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "title": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "title": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "title": "Lorem"}
    ];

    app.post("/api/assignment/website/:websiteId/page", createPage);
    app.get("/api/assignment/page/:pageId", findPageById);
    app.put("/api/assignment/page/:pageId", updatePage);
    app.delete("/api/assignment/website/:websiteId/page/:pageId", deletePage);
    app.get("/api/assignment/website/:websiteId/page", findAllPagesForWebsite);


    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            })
        // var results = [];
        //
        // for(var p in pages) {
        //     if(pages[p].websiteId === req.params.websiteId) {
        //         results.push(pages[p]);
        //     }
        // }
        //
        // res.json(results);
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        var websiteId = req.params.websiteId;
        pageModel
            .deletePagesFromWebsite(websiteId, pageId)
            .then(function (status) {
                res.send(status);
            });
        // for(var p in pages) {
        //     if(pages[p]._id === pageId) {
        //         pages.splice(p, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params.pageId;
        pageModel
            .updatePage(pageId, page)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.send(err);
            });
        // var page = req.body;
        // for(var p in pages) {
        //     if(pages[p]._id === req.params.pageId) {
        //         pages[p] = page;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId;
        pageModel
            .createPage(websiteId, page)
            .then(function (newPage) {
                res.json(newPage);
            }, function (err) {
                res.send(err);
            });
        // var page = req.body;
        // page._id = (new Date()).getTime() + "";
        // pages.push(page);
        // res.json(page);
    }


    function findPageById(req, res) {
        var pageId = req.params['pageId'];
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            });
        // var pageId = req.params['pageId'];
        // for(var p in pages) {
        //     if(pages[p]._id === pageId) {
        //         res.send(pages[p]);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }
}