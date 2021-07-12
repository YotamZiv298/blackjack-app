// Be in client (server) (get chips from server)
const placeBet = (amount) => {
    console.log("entered: placeBet");

    setBet(amount);
    setBalance(Math.round((balance - amount) * 100) / 100);
    setGameState(GameState.INIT);
};

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

export default [placeBet, checkWin];