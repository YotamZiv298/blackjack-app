import React, { Component, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Status from './components/status';
import Controls from './components/controls';
import Hand from './components/hand';

const App = () => {
  const [initData, setInitData] = useState('');
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState();

  const callAPI = () => {
    fetch('http://localhost:9000/')
      .then(res => { res.clone().json(); console.log(res); })
      .then(res => setInitData(res));
  };

  const fetchDeck = () => {
    fetch('http://localhost:9000/deck')
      .then(res => { res.clone().json(); console.log(res); })
      .then(res => setDeck(res));
  };

  const fetchCard = (dealType) => {
    fetch('http://localhost:9000/card/' + dealType)
      .then(res => { res.clone().json(); console.log(res); })
      .then(res => setCard(res));
  };

  useEffect(() => {
    callAPI();
    fetchDeck();
    setGameState(initData.GameState.BET);
    setButtonState(initData.Message.BET);
  }, []);

  const [playerCards, setPlayerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);

  const [dealerCards, setDealerCards] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);

  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(0);

  const [gameState, setGameState] = useState('');
  const [message, setMessage] = useState('');
  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true
  });

  // DONE
  useEffect(() => {
    if (gameState === initData.GameState.INIT) {
      deck = initData.shuffle(deck);

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
  }, [gameState]);

  // DONE
  useEffect(() => {
    initData.calcScore(playerCards, setPlayerScore);
    setPlayerCount(playerCount + 1);
  }, [playerCards]);

  // DONE
  useEffect(() => {
    initData.calcScore(dealerCards, setDealerScore);
    setDealerCount(dealerCount + 1);
  }, [dealerCards]);

  // DONE
  useEffect(() => {
    if (gameState === initData.GameState.PLAYER_TURN) {
      if (playerScore === 21) {
        buttonState.hitDisabled = true;
        setButtonState({ ...buttonState });
      } else if (playerScore > 21) {
        initData.bust();
      }
    }
  }, [playerCount]);

  // DONE
  useEffect(() => {
    if (gameState === GameState.DEALER_TURN) {
      if (dealerScore >= 17) {
        initData.checkWin();
      } else {
        fetchCard(initData.Deal.DEALER);
        // drawCard(Deal.DEALER);
      }
    }
  }, [dealerCount]);

  return (
    <div className='App'>
      <Status message={message} balance={balance} />
      <Controls
        balance={balance}
        gameState={gameState}
        buttonState={buttonState}
        betEvent={initData.placeBet}
        hitEvent={initData.hit}
        standEvent={initData.stand}
        resetEvent={initData.resetGame}
      />
      <div className='deckContainer'>
        <h2 className='deckCards'>{deck.length} cards left</h2>
      </div>
      <Hand name={'Dealer : ' + dealerScore} cards={dealerCards} />
      <Hand name={'You : ' + playerScore} cards={playerCards} />
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
