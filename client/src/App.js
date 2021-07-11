import React, { Component, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Status from './components/status';
import Controls from './components/controls';
import Hand from './components/hand'

const App = () => {
  const [apiResponse, setApiResponse] = useState('');

  const callAPI = () => {
    fetch('http://localhost:9000/')
      .then(res => { res.json(); console.log(res) })
      .then(res => setApiResponse(res));
  };

  useEffect(() => {
    callAPI();
  }, []);

  const [playerCards, setPlayerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);

  const [dealerCards, setDealerCards] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);

  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(0);

  const [gameState, setGameState] = useState(GameState.BET);
  const [message, setMessage] = useState(Message.BET);
  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true
  });

  // DONE
  useEffect(() => {
    if (gameState === GameState.INIT) {
      deck = shuffle(deck);

      fetch('http://localhost:9000/card')
        .then(res => { res.json(); console.log(res) })
        .then(res => setApiResponse(res));

      drawCard(Deal.PLAYER);
      drawCard(Deal.HIDDEN);
      drawCard(Deal.PLAYER);
      drawCard(Deal.DEALER);
      setGameState(GameState.PLAYER_TURN);
      setMessage(Message.HIT_STAND);
    }
  }, [gameState]);

  // DONE
  useEffect(() => {
    calcScore(playerCards, setPlayerScore);
    setPlayerCount(playerCount + 1);
  }, [playerCards]);

  // DONE
  useEffect(() => {
    calcScore(dealerCards, setDealerScore);
    setDealerCount(dealerCount + 1);
  }, [dealerCards]);

  // DONE
  useEffect(() => {
    if (gameState === GameState.PLAYER_TURN) {
      if (playerScore === 21) {
        buttonState.hitDisabled = true;
        setButtonState({ ...buttonState });
      } else if (playerScore > 21) {
        bust();
      }
    }
  }, [playerCount]);

  // DONE
  useEffect(() => {
    if (gameState === GameState.DEALER_TURN) {
      if (dealerScore >= 17) {
        checkWin();
      } else {
        drawCard(Deal.DEALER);
      }
    }
  }, [dealerCount]);

  return (
    <div className='App'>
      <Status message={apiResponse.message} balance={apiResponse.balance} />
      <Controls
        balance={apiResponse.balance}
        gameState={apiResponse.gameState}
        buttonState={apiResponse.buttonState}
        betEvent={apiResponse.placeBet}
        hitEvent={apiResponse.hit}
        standEvent={apiResponse.stand}
        resetEvent={apiResponse.resetGame}
      />
      <div className='deckContainer'>
        <h2 className='deckCards'>{apiResponse.deck.length} cards left</h2>
      </div>
      <Hand name={'Dealer : ' + apiResponse.dealerScore} cards={apiResponse.dealerCards} />
      <Hand name={'You : ' + apiResponse.playerScore} cards={apiResponse.playerCards} />
      Yotam Ⓒ

      {/* <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p className='App-intro'>{apiResponse}</p>
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
//       apiResponse: ''
//     };
//   }

//   callAPI() {
//     fetch('http://localhost:9000/')
//       .then(res => res.text())
//       .then(res => this.setState({ apiResponse: res }));
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
//           <p className='App-intro'>{this.state.apiResponse}</p>
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
