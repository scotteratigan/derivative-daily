const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/scraping', (req, res) => {
  res.render('scraping');
});

router.get('/testroute', (req, res) => {
  res.status(200).send('ok');
});

module.exports = router;
