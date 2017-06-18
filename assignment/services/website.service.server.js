// var app = require('../../express');
module.exports = function (app) {
    var websiteModel = require('../models/website/website.model.server');

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
        {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    ];

    app.get("/api/assignment/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/assignment/user/:userId/website", createWebsite);
    app.get("/api/assignment/website/:websiteId", findWebsiteById);
    app.put("/api/assignment/website/:websiteId", updateWebsite);
    app.delete("/api/assignment/user/:userId/website/:websiteId", deleteWebsite);


    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            })
        // var results = [];
        //
        // for(var v in websites) {
        //     if(websites[v].developerId === req.params.userId) {
        //         results.push(websites[v]);
        //     }
        // }
        //
        // res.json(results);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var userId = req.params.userId;
        websiteModel
            .deleteWebsiteFromUser(userId, websiteId)
            .then(function (status) {
                res.json(status);
            });
        // websiteModel
        //     .deleteWebsiteFromUser(websiteId)
        //     .then(function (status) {
        //         res.json(status);
        //     });
        // for(var w in websites) {
        //     if(websites[w]._id === websiteId) {
        //         websites.splice(w, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        websiteModel
            .updateWebsite(websiteId, website)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.send(err);
            });
        // var website = req.body;
        // for(var w in websites) {
        //     if(websites[w]._id === req.params.websiteId) {
        //         websites[w] = website;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;
        websiteModel
            .createWebsiteForUser(userId, website)
            .then(function (newWebsite) {
                res.json(newWebsite);
            }, function (err) {
                res.send(err);
            });
        // website._id = (new Date()).getTime() + "";
        // websites.push(website);
        // res.json(website);
    }


    function findWebsiteById(req, res) {
        var websiteId = req.params['websiteId'];
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            });
        // for(var w in websites) {
        //     if(websites[w]._id === websiteId) {
        //         res.send(websites[w]);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }
}
