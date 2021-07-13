var apiGameLogic = require('../apiGameLogic');

var express = require('express');
var router = express.Router();
// const cors = require('cors');

// router.use(cors({ allowedOrigins: ['*'] }));

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  apiGameLogic.resetDeck();
  apiGameLogic.shuffle();
  let data = {
    'GameState': apiGameLogic.GameState,
    'Deal': apiGameLogic.Deal,
    'Message': apiGameLogic.Message,

    'deck': apiGameLogic.getDeck()
  }
  res.json(data); // all
});

router.get('/resetDeck', function (req, res, next) {
  apiGameLogic.resetDeck();
  res.send('deck reset'); // only message
});

router.get('/deck', function (req, res, next) {
  // apiGameLogic.deck = apiGameLogic.shuffle(apiGameLogic.deck);
  res.send(apiGameLogic.getDeck()); // only deck
});

router.post('/card', function (req, res, next) {
  var dealType = req.body.dealType;

  let card = apiGameLogic.drawCard(dealType);
  res.json(card); // only card
});

module.exports = router;
