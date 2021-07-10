import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import jsonData from './components/deck.json';

const App = () => {
  const [apiResponse, setApiResponse] = useState('');

  const callAPI = () => {
    fetch('http://localhost:9000/')
      .then(res => res.text())
      .then(res => setApiResponse(res));
  };

  const componentWillMount = () => {
    callAPI();
  };

  return (
    <div className='App' >
      <Status message={message} balance={balance} />
      <Controls
        balance={balance}
        gameState={gameState}
        buttonState={buttonState}
        betEvent={placeBet}
        hitEvent={hit}
        standEvent={stand}
        resetEvent={resetGame}
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
