const axios = require('axios'); // for grabbing page to scrape
const cheerio = require('cheerio'); // for scraping
const db = require('../models');

module.exports = {
  getArticles(req, res) {
    db.Article.find({})
      .then((dbArticle) => {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch((err) => {
        // If an error occurred, send it to the client
        res.json(err);
      });
  },
  getArticle(req, res) {
    db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
      .populate('note')
      .then((dbArticle) => {
        // If we were able to successfully find an Article with the given id,
        // send it back to the client:
        res.json(dbArticle);
      })
      .catch((err) => {
        // If an error occurred, send it to the client
        res.json(err);
      });
  },
  createArticle(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then((dbNote) => {
        // If a Note was created successfully,
        // find one Article with an `_id` equal to
        // `req.params.id`. Then, update the Article to be associated
        // with the new Note.
        // { new: true } tells the query that we want it to return
        // the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain
        // another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id },
          { note: dbNote._id }, { new: true });
      })
      .then((dbArticle) => {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch((err) => {
        // If an error occurred, send it to the client
        res.json(err);
      });
  },
  scrapeArticles(req, res) {
    axios.get('http://www.echojs.com/').then((response) => {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $('article h2').each((i, element) => {
        // Save an empty result object
        const result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children('a')
          .text();
        result.link = $(this)
          .children('a')
          .attr('href');

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then((dbArticle) => {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch((err) => {
            // If an error occurred, log it
            console.log(err);
          });
      });

      // Send a message to the client
      res.send('Scrape Complete');
    });
  }
};
