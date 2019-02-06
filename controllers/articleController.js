/* eslint-disable no-underscore-dangle */
const axios = require('axios'); // for grabbing page to scrape
const cheerio = require('cheerio'); // for scraping
const db = require('../models');

const scrapeArticles = (req, res) => {
  // decided to scrape npr because the article limit on nytimes would hamper demos of the app
  // (users likely won't have a nytimes account)
  axios.get('https://www.npr.org/sections/news/').then((response) => {
    const $ = cheerio.load(response.data);
    $('article').each((i, element) => {
      let link;
      let title;
      try {
        link = $(element).find('div.imagewrap').find('a').attr('href');
        title = $(element).find('div.imagewrap').find('a').find('img')
          .attr('alt');
      } catch (err) {
        console.error('Error parsing article with cheerio:\n', err);
      }
      if (link && title) { // only add to db if both link and title are present
        db.Article.findOne({
          link,
        }, (err, article) => {
          if (err) {
            console.error('Error checking if article already exists:', err);
          }
          if (article) {
            console.log('Article exists.');
          } else {
            db.Article.create({
              title,
              link,
            })
              .then((dbArticle) => {
                console.log(dbArticle);
              })
              .catch((dbErr) => {
                console.error('Error adding scraped article to database:\n', dbErr);
              });
          }
        });
      }
    });
    res.redirect('/scraping.html');
  });
};

const getArticles = (req, res) => {
  db.Article.find({}).sort({})
    .then((dbArticle) => {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch((err) => {
      // If an error occurred, send it to the client
      res.json(err);
    });
};

const createArticle = (req, res) => {
  // Create a new note and pass the req.body to the entry
  console.log('req.body is:', req.body);
  db.Note.create(req.body)
    .then(dbNote => db.Article.findOneAndUpdate({
      _id: req.params.id,
    }, {
      note: dbNote._id,
    }, {
      new: true,
    }))
    .then((dbArticle) => {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch((err) => {
      // If an error occurred, send it to the client
      res.json(err);
    });
};

const getArticle = (req, res) => {
  db.Article.findOne({
    _id: req.params.id,
  })
    // ..and populate all of the notes associated with it
    .populate('note')
    .then((dbArticle) => {
      // If we were able to successfully find an Article with the given id,
      // send it back to the client
      res.json(dbArticle);
    })
    .catch((err) => {
      // If an error occurred, send it to the client
      res.json(err);
    });
};

module.exports = {
  createArticle,
  getArticle,
  getArticles,
  scrapeArticles,
};
