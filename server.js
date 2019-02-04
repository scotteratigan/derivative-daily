const EXPRESS_PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose'); // https://mongoosejs.com/docs/index.html
const logger = require('morgan'); // request logger
// const cheerio = require('cheerio');
// const axios = require('axios');

const routes = require('./routes');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
});

/* const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongoose database.');
  const kittySchema = new mongoose.Schema({
    name: String,
  });
  const Kitten = mongoose.model('Kitten', kittySchema);
  const myKitten = new Kitten({
    name: 'Holly',
  });
  console.log('My kitten is named:', myKitten.name); // 'Holly'
  myKitten.save((err, savedKitten) => {
    if (err) {
      throw new Error(err);
    }
    console.log('Saved kitten:', savedKitten.name);
  });
}); */

const app = express();
app.engine('handlebars',
  exphbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');
app.use(logger('dev')); // log http requests on dev server

// Parse request body as JSON:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public')); // Make public a static folder
app.use(routes);

app.listen(EXPRESS_PORT, () => {
  console.log(`Express running at: http://localhost:${EXPRESS_PORT}`);
});

module.exports = app; // for testing purposes
