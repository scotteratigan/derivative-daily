const router = require('express').Router();
const articleController = require('../controllers/articleController.js');

router.get('/articles', articleController.getArticles);
router.get('/articles/:id', articleController.getArticle);
router.post('/articles/:id', articleController.createArticle);
router.get('/scrape', articleController.scrapeArticles);

module.exports = router;
