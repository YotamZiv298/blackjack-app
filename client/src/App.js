import React, { Component, useEffect, useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';

// import clientGameLogic from "./components/clientGameLogic";

import Status from './components/status';
import Controls from './components/controls';
import Hand from './components/hand';

const App = () => {
  const [initData, setInitData] = useState();
  // const deck = [];
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState();

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
  useEffect(() => {
    fetch('http://localhost:9000/')
      .then(res => res.clone().json())
      .then(res => {
        setInitData(res);
        setDeck(res.deck);
        setGameState(res.GameState.BET);
        setMessage(res.Message.BET);
        console.log(res);
      });
  }, []);

  // Get Deck
  // useEffect(() => {
  //   fetch('http://localhost:9000/deck')
  //     .then(res => res.clone().json())
  //     .then(res => {
  //       setDeck(res);
  //       console.log(res);
  //     });
  // }, []);

  const fetchDeck = async () => {
    await fetch('http://localhost:9000/deck')
      .then(res => res.clone().json())
      .then(res => {
        console.log(res);
        setDeck(res);
        // return res;
      });
  };

  // Get Card
  const fetchCard = useCallback(async (dealType) => {
    await fetch('http://localhost:9000/card', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dealType: dealType,
      })
    })
      .then(res => res.clone().json())
      .then(res => {
        console.log(res);
        dealCard(dealType, res);
      });
  }, []);

  // DONE
  useEffect(() => {
    if (initData !== undefined && gameState !== undefined)
      if (gameState === initData.GameState.INIT) {
        // deck = initData.shuffle(deck);
        // setDeck(fetchDeck());
        fetchDeck();

        fetchCard(initData.Deal.PLAYER);
        fetchCard(initData.Deal.HIDDEN);
        fetchCard(initData.Deal.PLAYER);
        fetchCard(initData.Deal.DEALER);

        // drawCard(initData.Deal.PLAYER);
        // drawCard(initData.Deal.HIDDEN);
        // drawCard(initData.Deal.PLAYER);
        // drawCard(initData.Deal.DEALER);
        setGameState(initData.GameState.PLAYER_TURN);
        setMessage(initData.Message.HIT_STAND);
      }
  }, [initData, gameState, fetchCard]);

  // // DONE
  useEffect(() => {
    // if (initData !== undefined) {
    // initData.calcScore(playerCards, setPlayerScore);
    calcScore(playerCards, setPlayerScore);
    setPlayerCount(playerCount + 1);
    // }
  }, [playerCards]);

  // // DONE
  useEffect(() => {
    // if (initData !== undefined) {
    // initData.calcScore(dealerCards, setDealerScore);
    calcScore(dealerCards, setDealerScore);
    setDealerCount(dealerCount + 1);
    // }
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
  }, [playerCount]);

  // // DONE
  useEffect(() => {
    if (initData !== undefined && gameState !== undefined)
      if (gameState === initData.GameState.DEALER_TURN) {
        if (dealerScore >= 17) {
          // clientGameLogic.checkWin();
          checkWin();
        } else {
          fetchCard(initData.Deal.DEALER);
          // drawCard(Deal.DEALER);
        }
      }
  }, [dealerCount]);

  const resetGame = () => {
    console.log('entered: resetGame');
    //console.clear();
    //setDeck(data);
    if (initData !== undefined)
      // if (deck.length >= 4) {
      if (deck.length >= 4) {
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
    console.log("entered: placeBet");

    if (initData !== undefined) {
      setBet(amount);
      setBalance(Math.round((balance - amount) * 100) / 100);
      setGameState(initData.GameState.INIT);
    }
  };

  const dealCard = (dealType, card) => {
    console.log('entered: dealCard');

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

    // drawCard(Deal.PLAYER);
    if (initData !== undefined)
      fetchCard(initData.Deal.PLAYER);
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

  const refreshGame = () => {
    fetch('http://localhost:9000/initDeck')
      .then(res => res.clone().json())
      .then(res => {
        // setDeck(res);
        console.log(res);
      });
  };

  const checkWin = () => {
    console.log("entered: checkWin");
    if (initData !== undefined)
      if (playerScore > dealerScore || dealerScore > 21) {
        setBalance(Math.round((balance + (bet * 2)) * 100) / 100);
        setMessage(initData.Message.PLAYER_WIN);
      } else if (dealerScore > playerScore) {
        setMessage(initData.Message.DEALER_WIN);
      } else {
        setBalance(Math.round((balance + (bet * 1)) * 100) / 100);
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
            <h2 className='deckCards'>{deck.length} cards left</h2>
          </div>
          <Hand name={'Dealer : ' + dealerScore} cards={dealerCards} />
          <Hand name={'You : ' + playerScore} cards={playerCards} />
        </>
      }
      Yotam Ⓒ

      {/* <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p className='App-intro'>{initData}</p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
};

export default App;

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       initData: ''
//     };
//   }

//   callAPI() {
//     fetch('http://localhost:9000/')
//       .then(res => res.text())
//       .then(res => this.setState({ initData: res }));
//   }

//   componentWillMount() {
//     this.callAPI();
//   }

//   render() {
//     return (
//       <div className='App' >
//         <Status message={message} balance={balance} />
//         <Controls
//           balance={balance}
//           gameState={gameState}
//           buttonState={buttonState}
//           betEvent={placeBet}
//           hitEvent={hit}
//           standEvent={stand}
//           resetEvent={resetGame}
//         />
//         <div className='deckContainer'>
//           <h2 className='deckCards'>{deck.length} cards left</h2>
//         </div>
//         <Hand name={'Dealer : ' + dealerScore} cards={dealerCards} />
//         <Hand name={'You : ' + playerScore} cards={playerCards} />
//         Yotam Ⓒ
//         {/* <header className='App-header'>
//           <img src={logo} className='App-logo' alt='logo' />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <p className='App-intro'>{this.state.initData}</p>
//           <a
//             className='App-link'
//             href='https://reactjs.org'
//             target='_blank'
//             rel='noopener noreferrer'
//           >
//             Learn React
//           </a>
//         </header> */}
//       </div>
//     );
//   }
// }

// export default App;
