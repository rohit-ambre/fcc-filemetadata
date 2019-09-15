'use strict';

var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser')
const multer = require('multer');

const upload = multer({ dest: './uploads/' });

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function (req, res) {
    res.json({ greetings: "Hello, API" });
});

app.post('/api/fileanalyse', upload.single("upfile"), (req, res) => {
    res.send({ name: req.file.originalname, mimetype: req.file.mimetype, size: req.file.size })
});

const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Node.js listening ...');
});

module.exports = listener;