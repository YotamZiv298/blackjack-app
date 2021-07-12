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

const deck = JSON.parse(JSON.stringify(jsonData.cards));

// Be in server
const shuffle = (cards) => {
    console.log("entered: shuffle");

    let currentIndex = cards.length, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
    }

    return cards;
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

module.exports = {
    GameState,
    Deal,
    Message,

    deck,

    shuffle,
    drawCard
};
