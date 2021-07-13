var apiGameLogic = require('../apiGameLogic');

var express = require('express');
var router = express.Router();
// const cors = require('cors');

// router.use(cors({ allowedOrigins: ['*'] }));

// var data = {
// 'GameState': apiGameLogic.GameState,
// 'Deal': apiGameLogic.Deal,
// 'Message': apiGameLogic.Message,

// 'deck': apiGameLogic.deck,
// 'playerCards': gameLogic.playerCards,
// 'playerScore': gameLogic.playerScore,
// 'playerCount': gameLogic.playerCount,

// 'dealerCards': gameLogic.dealerCards,
// 'dealerScore': gameLogic.dealerScore,
// 'dealerCount': gameLogic.dealerCount,

// 'balance': gameLogic.balance,
// 'bet': gameLogic.bet,

// 'gameState': gameLogic.gameState,
// 'message': gameLogic.message,
// 'buttonState': gameLogic.buttonState,
// 'shuffle': apiGameLogic.shuffle,
// 'resetGame': gameLogic.resetGame,
// 'placeBet': gameLogic.placeBet,
// 'drawCard': apiGameLogic.drawCard,
// 'dealCard': gameLogic.dealCard,
// 'revealCard': gameLogic.revealCard,
// 'calcScore': gameLogic.calcScore,
// 'hit': gameLogic.hit,
// 'stand': gameLogic.stand,
// 'bust': gameLogic.bust,
// 'checkWin': gameLogic.checkWin
// };

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
  res.send('deck reseted'); // only message
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
