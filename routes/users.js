var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hello Word');
});

router.get('/me', (req, res, next) => {
  res.send('HI this me!');
});

module.exports = router;
