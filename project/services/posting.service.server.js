module.exports = function (app, models) {

    var postingModel = require('../models/posting/posting.model.server');

    app.post("/api/project/user/:userId/posting", createPostingForUser);
    app.get("/api/project/user/:userId/posting", findAllPostingsForUser);
    app.get("/api/project/posting/:postingId", findPostingById);
    app.put("/api/project/posting/:postingId", updatePosting);
    app.delete("/api/project/user/:userId/posting/:postingId", deletePosting);
    app.get('/api/project/search/posting/:keyword', searchByName);
    app.get("/api/project/posting/:postingId/details", getPosting);

    function getPosting(req, res) {
        var postingId = req.params.postingId;
        postingModel.getPosting(postingId).then(function (posting) {
            res.json(posting);
        })
    }

    function findAllPostingsForUser(req, res) {
        var userId = req.params.userId;
        postingModel
            .findAllPostingsForUser(userId)
            .then(function (postings) {
                res.json(postings);
            })
    }

    function searchByName(req, res) {
        var keyword = req.params['keyword'];
        postingModel
            .searchByName(keyword)
            .then(
                function (result) {
                    if (result) {
                        res.json(result);
                    } else {
                        res.status(404).send("No matched result in postings.");
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function createPostingForUser(req, res) {
        var posting = req.body;
        var userId = req.params['userId'];
        postingModel
            .createPostingForUser(userId, posting)
            .then(function (newPosting) {
                res.json(newPosting);
            }, function (error) {
                res.send(error);
            });
    }

    function findPostingById(req, res) {
        var postingId = req.params['postingId'];
        postingModel
            .findPostingById(postingId)
            .then(function (posting) {
                res.json(posting);
            });
    }

    function updatePosting(req, res) {
        var posting = req.body;
        var postingId = req.params['postingId'];
        postingModel
            .updatePosting(postingId, posting)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.send(err);
            });
    }

    function deletePosting(req, res) {
        var postingId = req.params['postingId'];
        var userId = req.params['userId'];
        postingModel
            .deletePosting(userId, postingId)
            .then(function (status) {
                res.json(status);
            });
    }
};