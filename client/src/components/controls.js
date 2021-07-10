import React from 'react';
import { useState } from 'react';

import styles from './styles/controls.module.css';

/**
 * Represents the game controls.
 * @param {number} balance - Player's balance of coins.
 * @param {number} gameState - State of the game at the moment.
 * @param {any} buttonState - Button's state at the moment.
 * @param {any} betEvent - Bet function.
 * @param {any} hitEvent - Hit function.
 * @param {any} standEvent - Stand function.
 * @param {any} resetEvent - Reset function.
 * @returns {JSX.Element} Controls.
 */
const Controls = (props) => {
    // Default amount for a bet.
    const [amount, setAmount] = useState(10);
    // Input style.
    const [inputStyle, setInputStyle] = useState(styles.input);

    /**
     * Sets the input style.
     * @returns true if the value is valid, else false.
     */
    const checkInputValue = () => {
        if (amount > props.balance || amount < 1) {
            setInputStyle(styles.inputError);
            return false;
        }
        setInputStyle(styles.input);
        return true;
    };

    /**
     * Retruns controls by game state.
     * @returns Controls.
     */
    const getControls = () => {
        if (props.gameState === 0) {
            return (
                <div className={styles.controlsContainer}>
                    <div className={styles.betContainer}>
                        <h2 className={styles.betTitle}>Amount:</h2>
                        <input type='number' value={amount} onChange={(e) => setAmount(+e.target.value)} className={inputStyle} />
                    </div>
                    <button onClick={() => checkInputValue() ? props.betEvent(Math.round(amount * 100) / 100) : undefined} className={styles.button}>Bet</button>
                    <button onClick={() => window.location.reload()} className={styles.button}>Refresh</button>
                </div>
            );
        }
        else {
            return (
                <div className={styles.controlsContainer}>
                    <button onClick={() => props.hitEvent()} disabled={props.buttonState.hitDisabled} className={styles.button}>Hit</button>
                    <button onClick={() => props.standEvent()} disabled={props.buttonState.standDisabled} className={styles.button}>Stand</button>
                    <button onClick={() => props.resetEvent()} disabled={props.buttonState.resetDisabled} className={styles.button}>Reset</button>
                    <button onClick={() => window.location.reload()} className={styles.button}>Refresh</button>
                </div>
            );
        }
    }

    return (
        <React.Fragment>
            {getControls()}
        </React.Fragment>
    );
};

export default Controls;
