// import gameLogic from '../gameLogic';

var gameLogic = require('../gameLogic');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  let data = {
    'data': gameLogic.data,
    'deck': gameLogic.deck,
    'playerCards': gameLogic.playerCards,
    'playerScore': gameLogic.playerScore,
    'playerCount': gameLogic.playerCount,
    'dealerCards': gameLogic.dealerCards,
    'dealerScore': gameLogic.dealerScore,
    'dealerCount': gameLogic.dealerCount,
    'balance': gameLogic.balance,
    'bet': gameLogic.bet,
    'gameState': gameLogic.gameState,
    'message': gameLogic.message,
    'buttonState': gameLogic.buttonState,
    'resetGame': gameLogic.resetGame,
    'placeBet': gameLogic.placeBet,
    'hit': gameLogic.hit,
    'stand': gameLogic.stand
  };
  res.json(data);
});

router.get('/card', function (req, res, next) {
  res.send();
});

module.exports = router;
