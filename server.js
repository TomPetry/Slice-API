require('dotenv').config();

var express = require('express'),
    app = express(),
    port = 80,
    mongoose = require("mongoose"),
    Task = require('./api/models/sliceModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/sliceDB');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw({ extended: true }));

var routes = require('./api/routes/sliceRoutes');
routes(app);

app.listen(port);

console.log('slice RESTful api server started on: ' + port);

app.use(function (req,res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})