// // var mongoose = require('mongoose');
// module.exports = function (mongoose) {
//
//     var postingSchema = require('./posting.schema.server');
//     var posting = mongoose.model('Posting', postingSchema);
//     var employerModel = require('../employer/employer.model.server');
//
//     posting.createPostingForEmployer = createPostingForEmployer;
//     posting.findAllPostingsForEmployer = findAllPostingsForEmployer;
//     posting.deletePosting = deletePosting;
//     posting.updatePosting = updatePosting;
//     posting.findPostingById = findPostingById;
//     posting.searchJobs = searchJobs;
//
//     module.exports = posting;
//
//     function updatePosting(postingId, posting) {
//         return posting
//             .update({_id: postingId},
//                 {$set:
//                     {
//                         job_title: posting.job_title,
//                         location: posting.location,
//                         field: posting.field,
//                         description: posting.description
//                     }
//                 });
//     }
//
//     function deletePosting(postingId) {
//         return posting
//             .remove({_id: postingId});
//     }
//
//     function findAllPostingsForEmployer(employerId) {
//         return posting
//             .find({_employer: employerId});
//     }
//
//     function createPostingForEmployer(employerId, posting) {
//         posting._employer = employerId;
//         return posting
//             .create(posting);
//     }
//
//     function findPostingById(postingId) {
//         return posting
//             .findById(postingId);
//     }
//
//     function searchJobs(searchObj) {
//         return posting.find(searchObj);
//     }
// };