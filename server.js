'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const PORT = process.env.PORT || 3000;
let app = express();

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended:true }))
    .use(bodyParser.text())
    .use(bodyParser.json({ type: 'application/vnd.api+json' }))
    .use(methodOverride('_method'))
    .use(logger('dev'))
    .use(express.static(__dirname + '/public'))
    .engine('handlebars', exphbs({ defaultLayout: 'main' }))
    .set('view engine', 'handlebars')
    .use(require('./controllers'));

mongoose.Promise = Promise;

const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/news";

mongoose.connect(dbURI, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

db.on("open", function() {
    console.log("Mongoose connection successful.");
    app.listen(PORT, function() {
        console.log("App running on port" + PORT);
    });
});

module.exports = app;