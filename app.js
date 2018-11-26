var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var osloRouter = require('./routes/index');
var indexBergen = require('./routes/bergen');
var indexTrheim = require('./routes/trheim');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', [osloRouter, indexBergen, indexTrheim]);

module.exports = app;
console.log("Server startet @ :3000");