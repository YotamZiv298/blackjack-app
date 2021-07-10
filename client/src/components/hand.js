import React from 'react';
import Card from './card';
import styles from './styles/hand.module.css'

/**
 * Represents a hand.
 * @param {any[]} cards - Hand cards.
 * @param {string} name - Name of the hand holder.
 * @returns {JSX.Element} Hand.
 */
const Hand = (props) => {
    const getName = () => {
        if (props.cards.length > 0) {
            return (
                <h1 className={styles.name}>{props.name}</h1>
            );
        }
    }
    return (
        <React.Fragment>
            <div className={styles.handContainer}>
                {getName()}
                <div className={styles.cardContainer}>
                    {props.cards.map((card, i) => {
                        return (
                            <Card
                                key={i}
                                rank={card.rank}
                                suit={card.suit}
                                imagePath={card.imagePath}
                                hidden={card.hidden}
                            />
                        );
                    })}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Hand;
