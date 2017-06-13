// var q = require('q');
// const app = require('../../express');
// const https = require('https');
// const querystring = require('querystring');
//
// app.get('/api/oxford/query/language/:language/word/:word', searchJobs);
//
// var appId = process.env.INDEED_APP_ID;
// var appKey = process.env.INDEED_APP_KEY;
// var baseUrl = process.env.INDEED_API_BASE_URL;
//
// function searchJobs(req, res) {
//     // var title     = req.query['q'];
//     // var location = req.query['l'];
//     // var country = req.query['co'];
//     var word = req.params.word;
//     jobSearchQuery()
//         .then(function(response){
//             res.json(response);
//             console.log("In server")
//         }, function (error) {
//             res.sendStatus(404).send(error);
//         });
// }
//
// function jobSearchQuery() {
//
//     var deferred = q.defer();
//     console.log("in job serch q")
//     https.get({
//         host: 'api.indeed.com',
//         path:'/ads/apigetjobs?publisher=9954334827924258&jobkeys=2952f596a182339d&v=2&format=json',
//         headers: {
//             "Accept": "application/json"
//         }
//     }, function(response) {
//         var body = '';
//         response.on('data', function(d) {
//             body += d;
//         });
//         response.on('end', function() {
//             try {
//                 body = JSON.parse(body);
//                 deferred.resolve(body);
//             } catch(e) {
//                 deferred.reject({error: e});
//             }
//         });
//     });
//     return deferred.promise;
//
// }
//
//
//
