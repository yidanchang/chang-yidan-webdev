// module.exports = function(app, models) {
//
//     var posting = require('../models/posting/posting.model.server');
//
//     app.post("/api/project/employer/:employerId/posting", createPostingForEmployer);
//     app.get("/api/project/employer/:employerId/posting", findAllPostingsForEmployer);
//     app.get("/api/project/posting/:postingId", findPostingById);
//     app.put("/api/project/posting/:postingId", updatePosting);
//     app.delete("/api/project/posting/:postingId", deleteAlbum);
//     app.post('/api/project/search/location/:location/field/:field', searchJobs);
//     app.post('/api/project/search/posting/:postingId', findPostingById);
//
//
//     function searchJobs(req,res) {
//         var searchObj = req.body;
//         posting
//             .searchJobs(searchObj)
//             .then(function(result) {
//                     if (result) {
//                         res.json(result);
//                     } else {
//                         res.status(404).send("No matched result.");
//                     }
//                 }, function (err) {
//                     res.status(400).send(err);
//                 }
//
//             )
//     }
//
//
//     function createPostingForEmployer(req, res) {
//         var posting = req.body;
//         var employerId = req.params.employerId;
//         posting
//             .createPostingForEmployer(employerId, posting)
//             .then(function(newPosting) {
//                     res.json(newPosting);
//                 }, function(error) {
//                     res.status(400).send(error);
//                 });
//     }
//
//     function findAllPostingsForEmployer(req, res) {
//         var employerId = req.params.employerId;
//         posting
//             .findAllPostingsForEmployer(employerId)
//             .then(function(postings) {
//                     res.json(postings);
//                 });
//     }
//
//     function findPostingById(req, res) {
//         var postingId = req.params.postingId;
//         posting
//             .findPostingById(postingId)
//             .then(function(posting) {
//                     res.json(posting);
//                 });
//     }
//
//     function updatePosting(req, res) {
//         var posting = req.body;
//         var postingId = req.params.postingId;
//         posting
//             .updatePosting(postingId, posting)
//             .then(function (status) {
//                 res.send(status);
//             }, function (err) {
//                 res.send(err);
//             });
//     }
//
//     function deleteAlbum(req, res) {
//         var id = req.params.albumId;
//         albumModel
//             .deleteAlbum(id)
//             .then(
//                 function(status) {
//                     res.sendStatus(200);
//                 },
//                 function(error) {
//                     res.status(400).send("Unable to delete this album");
//                 }
//             );
//     }
// };