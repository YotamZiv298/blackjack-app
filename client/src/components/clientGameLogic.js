// Be in client (UI)
// const resetGame = () => {
//     console.log("entered: resetGame");
//     //console.clear();
//     //setDeck(data);
//     if (deck.length >= 4) {
//         setPlayerCards([]);
//         setPlayerScore(0);
//         setPlayerCount(0);

//         setDealerCards([]);
//         setDealerScore(0);
//         setDealerCount(0);

//         setBet(0);

//         setGameState(GameState.BET);
//         setMessage(Message.BET);
//         setButtonState({
//             hitDisabled: false,
//             standDisabled: false,
//             resetDisabled: true
//         });
//     } else {
//         alert('Low card count, press Refresh to start a new game.');
//     }
// };

// Be in client (server) (get chips from server)
const placeBet = (amount) => {
    console.log("entered: placeBet");

    setBet(amount);
    setBalance(Math.round((balance - amount) * 100) / 100);
    setGameState(GameState.INIT);
};

// Be in client (UI)
// const dealCard = (dealType, card) => {
//     console.log("entered: dealCard");

//     let info = {
//         rank: card.rank,
//         suit: card.suit,
//         imagePath: card.imagePath,
//         hidden: false
//     };
//     switch (dealType) {
//         case Deal.PLAYER:
//             playerCards.push(info);
//             setPlayerCards([...playerCards]);
//             break;
//         case Deal.DEALER:
//             dealerCards.push(info);
//             setDealerCards([...dealerCards]);
//             break;
//         case Deal.HIDDEN:
//             info.hidden = true;
//             dealerCards.push(info);
//             setDealerCards([...dealerCards]);
//             break;
//         default:
//             break;
//     }
// };

// Be in client (UI)
// const revealCard = () => {
//     console.log("entered: revealCard");

//     dealerCards.filter((card) => {
//         if (card.hidden === true) {
//             card.hidden = false;
//         }
//         return card;
//     });
//     setDealerCards([...dealerCards])
// };

// Be in client (UI)
// const calcScore = (cards, setScore) => {
//     console.log("entered: calcScore");

//     let total = 0;

//     cards.forEach((card) => {
//         if (card.hidden === false && card.rank !== 'A') {
//             switch (card.rank) {
//                 case 'K':
//                     total += 10;
//                     break;
//                 case 'Q':
//                     total += 10;
//                     break;
//                 case 'J':
//                     total += 10;
//                     break;
//                 default:
//                     total += +card.rank;
//                     break;
//             }
//         }
//     });

//     const aces = cards.filter((card) => {
//         return card.rank === 'A';
//     });

//     aces.forEach((card) => {
//         if (card.hidden === false) {
//             if ((total + 11) > 21) {
//                 total += 1;
//             }
//             else if ((total + 11) === 21) {
//                 if (aces.length > 1) {
//                     total += 1;
//                 }
//                 else {
//                     total += 11;
//                 }
//             }
//             else {
//                 total += 11;
//             }
//         }
//     });

//     setScore(total);
// };

// Be in client (UI)
// const hit = () => {
//     console.log("entered: hit");

//     drawCard(Deal.PLAYER);
// };

// Be in client (UI)
// const stand = () => {
//     console.log("entered: stand");

//     buttonState.hitDisabled = true;
//     buttonState.standDisabled = true;
//     buttonState.resetDisabled = false;
//     setButtonState({ ...buttonState });

//     setGameState(GameState.DEALER_TURN);
//     revealCard();
// };

// Be in client (UI)
// const bust = () => {
//     console.log("entered: bust");

//     buttonState.hitDisabled = true;
//     buttonState.standDisabled = true;
//     buttonState.resetDisabled = false;
//     setButtonState({ ...buttonState });
//     setMessage(Message.BUST);
// };

// Be in client (Logic)
const checkWin = () => {
    console.log("entered: checkWin");

    if (playerScore > dealerScore || dealerScore > 21) {
        setBalance(Math.round((balance + (bet * 2)) * 100) / 100);
        setMessage(Message.PLAYER_WIN);
    } else if (dealerScore > playerScore) {
        setMessage(Message.DEALER_WIN);
    } else {
        setBalance(Math.round((balance + (bet * 1)) * 100) / 100);
        setMessage(Message.TIE);
    }
};

// const GameState = {
//     BET,
//     INIT,
//     PLAYER_TURN,
//     DEALER_TURN
// };

// const Deal = {
//     PLAYER,
//     DEALER,
//     HIDDEN
// };

// const Message = {
//     BET = 'Place a Bet',
//     HIT_STAND = 'Hit or Stand',
//     BUST = 'Bust',
//     PLAYER_WIN = 'You Win',
//     DEALER_WIN = 'Dealer Wins',
//     TIE = 'Tie'
// };

// const data = JSON.parse(JSON.stringify(jsonData.cards));
// const [deck, setDeck] = useState(data);

// const [playerCards, setPlayerCards] = useState([]);
// const [playerScore, setPlayerScore] = useState(0);
// const [playerCount, setPlayerCount] = useState(0);

// const [dealerCards, setDealerCards] = useState([]);
// const [dealerScore, setDealerScore] = useState(0);
// const [dealerCount, setDealerCount] = useState(0);

// const [balance, setBalance] = useState(100);
// const [bet, setBet] = useState(0);

// const [gameState, setGameState] = useState(GameState.BET);
// const [message, setMessage] = useState(Message.BET);
// const [buttonState, setButtonState] = useState({
//     hitDisabled: false,
//     standDisabled: false,
//     resetDisabled: true
// });

// const shuffle = (cards) => {
//     let currentIndex = cards.length, randomIndex;

//     while (0 !== currentIndex) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex--;

//         [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
//     }
//     return cards;
// };

// // DONE
// useEffect(() => {
//     if (gameState === GameState.INIT) {
//         setDeck(shuffle(deck));

//         drawCard(Deal.PLAYER);
//         drawCard(Deal.HIDDEN);
//         drawCard(Deal.PLAYER);
//         drawCard(Deal.DEALER);
//         setGameState(GameState.PLAYER_TURN);
//         setMessage(Message.HIT_STAND);
//     }
// }, [gameState]);

// // DONE
// useEffect(() => {
//     calcScore(playerCards, setPlayerScore);
//     setPlayerCount(playerCount + 1);
// }, [playerCards]);

// // DONE
// useEffect(() => {
//     calcScore(dealerCards, setDealerScore);
//     setDealerCount(dealerCount + 1);
// }, [dealerCards]);

// // DONE
// useEffect(() => {
//     if (gameState === GameState.PLAYER_TURN) {
//         if (playerScore === 21) {
//             buttonState.hitDisabled = true;
//             setButtonState({ ...buttonState });
//         } else if (playerScore > 21) {
//             bust();
//         }
//     }
// }, [playerCount]);

// // DONE
// useEffect(() => {
//     if (gameState === GameState.DEALER_TURN) {
//         if (dealerScore >= 17) {
//             checkWin();
//         } else {
//             drawCard(Deal.DEALER);
//         }
//     }
// }, [dealerCount]);

// // DONE
// const resetGame = () => {
//     //console.clear();
//     //setDeck(data);
//     if (deck.length >= 4) {
//         setPlayerCards([]);
//         setPlayerScore(0);
//         setPlayerCount(0);

//         setDealerCards([]);
//         setDealerScore(0);
//         setDealerCount(0);

//         setBet(0);

//         setGameState(GameState.BET);
//         setMessage(Message.BET);
//         setButtonState({
//             hitDisabled: false,
//             standDisabled: false,
//             resetDisabled: true
//         });
//     } else {
//         alert('Low card count, press Refresh to start a new game.');
//     }
// };

// // DONE
// const placeBet = (amount) => {
//     setBet(amount);
//     setBalance(Math.round((balance - amount) * 100) / 100);
//     setGameState(GameState.INIT);
// };

// // DONE
// const drawCard = (dealType) => {
//     if (deck.length > 0) {
//         // const randomIndex = Math.floor(Math.random() * deck.length);
//         // const card = deck[randomIndex];
//         // deck.splice(randomIndex, 1);
//         const card = deck[0];
//         deck.splice(0, 1);

//         console.log('Remaining Cards:', deck.length);

//         switch (card.suit) {
//             case 'spades':
//                 dealCard(dealType, card);
//                 break;
//             case 'diamonds':
//                 dealCard(dealType, card);
//                 break;
//             case 'clubs':
//                 dealCard(dealType, card);
//                 break;
//             case 'hearts':
//                 dealCard(dealType, card);
//                 break;
//             default:
//                 break;
//         }
//     }
//     else {
//         alert('All cards have been drawn');
//     }
// };

// // DONE
// const dealCard = (dealType, card) => {
//     let info = {
//         rank: card.rank,
//         suit: card.suit,
//         imagePath: card.imagePath,
//         hidden: false
//     };
//     switch (dealType) {
//         case Deal.PLAYER:
//             playerCards.push(info);
//             setPlayerCards([...playerCards]);
//             break;
//         case Deal.DEALER:
//             dealerCards.push(info);
//             setDealerCards([...dealerCards]);
//             break;
//         case Deal.HIDDEN:
//             info.hidden = true;
//             dealerCards.push(info);
//             setDealerCards([...dealerCards]);
//             break;
//         default:
//             break;
//     }
// };

// // DONE
// const revealCard = () => {
//     dealerCards.filter((card) => {
//         if (card.hidden === true) {
//             card.hidden = false;
//         }
//         return card;
//     });
//     setDealerCards([...dealerCards])
// };

// // DONE
// const calcScore = (cards, setScore) => {
//     let total = 0;

//     cards.forEach((card) => {
//         if (card.hidden === false && card.rank !== 'A') {
//             switch (card.rank) {
//                 case 'K':
//                     total += 10;
//                     break;
//                 case 'Q':
//                     total += 10;
//                     break;
//                 case 'J':
//                     total += 10;
//                     break;
//                 default:
//                     total += +card.rank;
//                     break;
//             }
//         }
//     });

//     const aces = cards.filter((card) => {
//         return card.rank === 'A';
//     });

//     aces.forEach((card) => {
//         if (card.hidden === false) {
//             if ((total + 11) > 21) {
//                 total += 1;
//             }
//             else if ((total + 11) === 21) {
//                 if (aces.length > 1) {
//                     total += 1;
//                 }
//                 else {
//                     total += 11;
//                 }
//             }
//             else {
//                 total += 11;
//             }
//         }
//     });

//     setScore(total);
// };

// // DONE
// const hit = () => {
//     drawCard(Deal.PLAYER);
// };

// // DONE
// const stand = () => {
//     buttonState.hitDisabled = true;
//     buttonState.standDisabled = true;
//     buttonState.resetDisabled = false;
//     setButtonState({ ...buttonState });

//     setGameState(GameState.DEALER_TURN);
//     revealCard();
// };

// // DONE
// const bust = () => {
//     buttonState.hitDisabled = true;
//     buttonState.standDisabled = true;
//     buttonState.resetDisabled = false;
//     setButtonState({ ...buttonState });
//     setMessage(Message.BUST);
// };

// // DONE
// const checkWin = () => {
//     if (playerScore > dealerScore || dealerScore > 21) {
//         setBalance(Math.round((balance + (bet * 2)) * 100) / 100);
//         setMessage(Message.PLAYER_WIN);
//     } else if (dealerScore > playerScore) {
//         setMessage(Message.DEALER_WIN);
//     } else {
//         setBalance(Math.round((balance + (bet * 1)) * 100) / 100);
//         setMessage(Message.TIE);
//     }
// };
