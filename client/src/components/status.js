import React from 'react';

import styles from './styles/status.module.css';

/**
 * Represents the status.
 * @param {string} message - Current game state message to be displayed.
 * @param {number} balance - Balance of player's coins.
 * @returns Status.
 */
const Status = (props) => {
    return (
        <React.Fragment>
            <div className={styles.statusContainer}>
                <div className={styles.status}>
                    <h1 className={styles.value}>{props.message}</h1>
                </div>
                <div className={styles.balance}>
                    <h1 className={styles.value}>{props.balance} coins</h1>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Status;
