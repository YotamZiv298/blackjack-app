// import gameLogic from '../gameLogic';

var gameLogic = require('../gameLogic');

var express = require('express');
var router = express.Router();

var data = {
  'GameState': gameLogic.GameState,
  'Deal': gameLogic.Deal,
  'Message': gameLogic.Message,

  'deck': gameLogic.deck,
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

  'resetGame': gameLogic.resetGame,
  'placeBet': gameLogic.placeBet,
  'drawCard': gameLogic.drawCard,
  'dealCard': gameLogic.dealCard,
  'revealCard': gameLogic.revealCard,
  'calcScore': gameLogic.calcScore,
  'hit': gameLogic.hit,
  'stand': gameLogic.stand,
  'bust': gameLogic.bust,
  'checkWin': gameLogic.checkWin
};

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json(data);
});

router.get('/deck', function (req, res, next) {
  res.send(gameLogic.deck);
});

router.get('/card/:dealType', function (req, res, next) {
  let card = gameLogic.drawCard(req.params.dealType);
  res.send(card);
});

module.exports = router;
