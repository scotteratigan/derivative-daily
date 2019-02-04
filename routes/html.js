const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('This is the index page.');
});

router.get('/testroute', (req, res) => {
  res.send('Test is working.');
});

module.exports = router;
