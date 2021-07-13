let jsonData = require('../client/src/components/deck.json');

// move chips money to here

const GameState = {
    BET: 0,
    INIT: 1,
    PLAYER_TURN: 2,
    DEALER_TURN: 3
};

const Deal = {
    PLAYER: 0,
    DEALER: 1,
    HIDDEN: 2
};

const Message = {
    BET: 'Place a Bet',
    HIT_STAND: 'Hit or Stand',
    BUST: 'Bust',
    PLAYER_WIN: 'You Win',
    DEALER_WIN: 'Dealer Wins',
    TIE: 'Tie'
};

const data = JSON.stringify(jsonData.cards);
let deck = [];

const getDeck = () => {
    return deck;
}

// Be in server
const shuffle = () => {
    console.log("entered: shuffle");

    let currentIndex = deck.length, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
    }
};

// Be in server
const drawCard = (dealType) => {
    console.log("entered: drawCard");

    if (deck.length > 0) {
        const card = deck[0];
        deck.splice(0, 1);

        console.log('Remaining Cards:', deck.length);
        // dealCard(dealType, card);
        return card;
    } else {
        alert('All cards have been drawn');
    }
};

const resetDeck = () => {
    deck = JSON.parse(data);
};

module.exports = {
    GameState,
    Deal,
    Message,
    
    getDeck,
    shuffle,
    drawCard,
    resetDeck
};
