import React, { useEffect, useState } from 'react';
import './App.css';

import Status from './components/status';
import Controls from './components/controls';
import Hand from './components/hand';

const App = () => {
  const [initData, setInitData] = useState();
  const [deckLength, setDeckLength] = useState(0);

  const [playerCards, setPlayerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);

  const [dealerCards, setDealerCards] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);

  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(0);

  const [gameState, setGameState] = useState();
  const [message, setMessage] = useState();
  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true
  });

  // Get initData
  useEffect(async () => {
    await fetch('http://localhost:9000/')
      .then(res => res.clone().json())
      .then(res => {
        setInitData(res);
        setDeckLength(res.deck.length);
        setGameState(res.GameState.BET);
        setMessage(res.Message.BET);
        console.log('initData:');
        console.log(res);
      });
  }, []);

  const fetchDeck = async () => {
    await fetch('http://localhost:9000/deck')
      .then(res => res.clone().json())
      .then(res => {
        console.log('deck:');
        console.log(res);
        setDeckLength(res.length);
      });
  };

  // Get Card
  const fetchCard = async (dealType) => {
    let card;
    await fetch('http://localhost:9000/card', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dealType: dealType,
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log('card:');
        console.log(res);
        card = res;
      });
    dealCard(dealType, card);
  };

  // DONE
  useEffect(() => {
    if (initData !== undefined && gameState !== undefined)
      if (gameState === initData.GameState.INIT) {
        fetchDeck();

        fetchCard(initData.Deal.PLAYER);
        fetchCard(initData.Deal.HIDDEN);
        fetchCard(initData.Deal.PLAYER);
        fetchCard(initData.Deal.DEALER);

        setGameState(initData.GameState.PLAYER_TURN);
        setMessage(initData.Message.HIT_STAND);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initData, gameState]);

  // // DONE
  useEffect(() => {
    calcScore(playerCards, setPlayerScore);
    setPlayerCount(prevPlayerCount => prevPlayerCount + 1);
  }, [playerCards]);

  // // DONE
  useEffect(() => {
    calcScore(dealerCards, setDealerScore);
    setDealerCount(dealerCount + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealerCards]);

  // // DONE
  useEffect(() => {
    if (initData !== undefined && gameState !== undefined)
      if (gameState === initData.GameState.PLAYER_TURN) {
        if (playerScore === 21) {
          buttonState.hitDisabled = true;
          setButtonState({ ...buttonState });
        } else if (playerScore > 21) {
          bust();
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerCount]);

  // // DONE
  useEffect(() => {
    if (initData !== undefined && gameState !== undefined)
      if (gameState === initData.GameState.DEALER_TURN) {
        if (dealerScore >= 17) {
          checkWin();
        } else {
          fetchCard(initData.Deal.DEALER);
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealerCount]);

  const resetGame = () => {
    console.log('entered: resetGame');
    if (initData !== undefined)
      if (deckLength >= 4) {
        setPlayerCards([]);
        setPlayerScore(0);
        setPlayerCount(0);

        setDealerCards([]);
        setDealerScore(0);
        setDealerCount(0);

        setBet(0);

        setGameState(initData.GameState.BET);
        setMessage(initData.Message.BET);
        setButtonState({
          hitDisabled: false,
          standDisabled: false,
          resetDisabled: true
        });
      } else {
        alert('Low card count, press Refresh to start a new game.');
      }
  };

  const placeBet = (amount) => {
    console.log('entered: placeBet');

    if (initData !== undefined) {
      setBet(amount);
      setBalance(Math.round((balance - amount) * 100) / 100);
      setGameState(initData.GameState.INIT);
    }
  };

  const dealCard = (dealType, card) => {
    console.log('entered: dealCard');
    console.log(`initData: ${initData}`)
    if (initData !== undefined) {
      let info = {
        rank: card.rank,
        suit: card.suit,
        imagePath: card.imagePath,
        hidden: false
      };
      switch (dealType) {
        case initData.Deal.PLAYER:
          playerCards.push(info);
          setPlayerCards([...playerCards]);
          break;
        case initData.Deal.DEALER:
          dealerCards.push(info);
          setDealerCards([...dealerCards]);
          break;
        case initData.Deal.HIDDEN:
          info.hidden = true;
          dealerCards.push(info);
          setDealerCards([...dealerCards]);
          break;
        default:
          break;
      }
      // setDeckLength(len => len - 1);
      fetchDeck();
    }
  };

  const revealCard = () => {
    console.log('entered: revealCard');

    dealerCards.filter((card) => {
      if (card.hidden === true) {
        card.hidden = false;
      }
      return card;
    });
    setDealerCards([...dealerCards])
  };

  const calcScore = (cards, setScore) => {
    console.log('entered: calcScore');

    let total = 0;

    cards.forEach((card) => {
      if (card.hidden === false && card.rank !== 'A') {
        switch (card.rank) {
          case 'K':
            total += 10;
            break;
          case 'Q':
            total += 10;
            break;
          case 'J':
            total += 10;
            break;
          default:
            total += +card.rank;
            break;
        }
      }
    });

    const aces = cards.filter((card) => {
      return card.rank === 'A';
    });

    aces.forEach((card) => {
      if (card.hidden === false) {
        if ((total + 11) > 21) {
          total += 1;
        }
        else if ((total + 11) === 21) {
          if (aces.length > 1) {
            total += 1;
          }
          else {
            total += 11;
          }
        }
        else {
          total += 11;
        }
      }
    });

    setScore(total);
  };

  const hit = () => {
    console.log('entered: hit');

    if (initData !== undefined)
      if (deckLength >= 2) {
        fetchCard(initData.Deal.PLAYER);
      } else {
        alert('low card count, stand with current Hand or press Refresh for a new game');
      }
  };

  const stand = () => {
    console.log('entered: stand');

    if (initData !== undefined) {
      buttonState.hitDisabled = true;
      buttonState.standDisabled = true;
      buttonState.resetDisabled = false;
      setButtonState({ ...buttonState });

      setGameState(initData.GameState.DEALER_TURN);
      revealCard();
    }
  };

  const bust = () => {
    console.log('entered: bust');
    if (initData !== undefined) {
      buttonState.hitDisabled = true;
      buttonState.standDisabled = true;
      buttonState.resetDisabled = false;
      setButtonState({ ...buttonState });
      setMessage(initData.Message.BUST);
    }
  };

  const refreshGame = async () => {
    await fetch('http://localhost:9000/resetDeck')
      .then(res => {
        console.log(res);
      });
  };

  const checkWin = () => {
    console.log('entered: checkWin');

    if (initData !== undefined)
      if (playerScore > dealerScore || dealerScore > 21) {
        setBalance(Math.round((balance + (bet * 2)) * 100) / 100); // Get double from player bet
        setMessage(initData.Message.PLAYER_WIN);
      } else if (dealerScore > playerScore) {
        setMessage(initData.Message.DEALER_WIN);
      } else {
        setBalance(Math.round((balance + (bet * 1)) * 100) / 100); // Get same from player bet
        setMessage(initData.Message.TIE);
      }
  };

  return (
    <div className='App'>
      {
        initData !== undefined && gameState !== undefined &&
        <>
          <Status message={message} balance={balance} />
          <Controls
            balance={balance}
            gameState={gameState}
            buttonState={buttonState}
            betEvent={placeBet}
            hitEvent={hit}
            standEvent={stand}
            resetEvent={resetGame}
            refreshEvent={refreshGame}
          />
          <div className='deckContainer'>
            <h2 className='deckCards'>{deckLength} cards left</h2>
          </div>
          <Hand name={'Dealer : ' + dealerScore} cards={dealerCards} />
          <Hand name={'You : ' + playerScore} cards={playerCards} />
        </>
      }
      Yotam Ⓒ
    </div>
  );
};

export default App;
