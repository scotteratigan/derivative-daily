const EXPRESS_PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose'); // https://mongoosejs.com/docs/index.html
const logger = require('morgan'); // request logger
const path = require('path');
const routes = require('./routes');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = express();
app.engine('handlebars',
  exphbs({
    defaultLayout: 'main',
  }));

app.set('view engine', 'handlebars');
app.use(logger('dev')); // log http requests on dev server

// Parse request body as JSON:
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

app.use(routes);
// app.use(express.static('public')); // Make public a static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(EXPRESS_PORT, () => {
  console.log(`Express running at: http://localhost:${EXPRESS_PORT}`);
});

module.exports = app; // for testing purposes
