const app = require('../../express');

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

var multer = require('multer'); // npm install multer --save
// var crypto = require('crypto');
// var mime = require('mime');
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, __dirname + '/../../public/assignment/uploads')
//     },
//     filename: function (req, file, cb) {
//         crypto.pseudoRandomBytes(16, function (err, raw) {
//             cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
//         });
//     }
// });

var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
// var upload = multer({ storage: storage });

app.post ("/api/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    if (myFile === null || typeof myFile === 'undefined') {
        res.sendStatus(404);
    }

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    for(var w in widgets) {
        if (widgets[w]._id === widgetId) {
            var widget = widgets[w];
        }
    }

    // widget = findWidgetById(widgetId);
    widget.url = '/assignment/uploads/'+filename;
    //widget.name = originalname;
    var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

    res.redirect(callbackUrl);
}

app.post("/api/assignment/page/:pageId/widget", createWidget);
app.get ("/api/assignment/widget/:widgetId", findWidgetById);
app.put ("/api/assignment/widget/:widgetId", updateWidget);
app.delete ("/api/assignment/widget/:widgetId", deleteWidget);
app.get("/api/assignment/page/:pageId/widget", findAllWidgetsForPage);
app.put("/api/assignment/page/:pageId/widget", sortWidget);


function sortWidget (req, res) {
    var initial = req.body['initial'];
    var final = req.body['final'];

    var result = [];
    var pageId = req.params['pageId'];
    for (var w in widgets) {
        if (widgets[w].pageId === pageId) {
            result.push(w);
        }
    }

    var originalIndex = result[initial];
    var newIndex = result[final];

    var widget = widgets[originalIndex];
    widgets.splice(originalIndex, 1);
    widgets.splice(newIndex, 0, widget);

    res.sendStatus(200)
}

function findAllWidgetsForPage(req, res) {
    var results = [];

    for(var w in widgets) {
        if(widgets[w].pageId === req.params.pageId) {
            results.push(widgets[w]);
        }
    }

    res.json(results);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            widgets.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWidget(req, res) {
    var widget = req.body;
    for(var w in widgets) {
        if(widgets[w]._id === req.params.widgetId) {
            widgets[w] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function createWidget(req, res) {
    var newWidget = req.body;
    newWidget._id = (new Date()).getTime() + "";
    widgets.push(newWidget);
    res.json(newWidget);
}


function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            res.send(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
}
