const config = require('./Config/config.js');
var express = require('express');
let app = require('express')();
const path = require('path');
let bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
var cors = require('cors');
const fileUpload = require('express-fileupload');

mongoose.set('useFindAndModify', false);

app.use(fileUpload());

// Bypass CORS security
app.use(cors());

app.use(express.static('public'));

// Mongoose DB connection
mongoose.connect("mongodb://localhost:27042/sportDB",{useCreateIndex: true,useNewUrlParser:true});
let db = mongoose.connection;

//Check connection
db.once('open', function(){
    console.log('Connection to MongoDB successfull');
});

//Check DB errors
db.on('error', function(err){
    console.log(err);
});

// Template
app.set('view engine', 'pug');
app.use(session({
    secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: true}));


// MiddleWare
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

/// Routes
let usersRouter = require('./Routes/users');
let categoryRouter = require('./Routes/category');
let commentRouter = require('./Routes/comment');
let eventRouter = require('./Routes/event');

app.use('/', usersRouter);
app.use('/', categoryRouter);
app.use('/', commentRouter);
app.use('/', eventRouter);

app.listen(4242);
module.exports = app;