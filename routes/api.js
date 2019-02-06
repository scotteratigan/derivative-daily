const router = require('express').Router();
const articleController = require('../controllers/articleController.js');

router.get('/articles', articleController.getArticles);
router.get('/articles/:id', articleController.getArticle);
router.post('/addnote/:id', articleController.createNote);
router.post('/removenote/:id', articleController.deleteNote);
router.get('/scrape', articleController.scrapeArticles);

module.exports = router;
