var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Poker Range' });
});


/* Game route */
const game = require('./game');
router.use('/game', game)

module.exports = router;
