import React, { useEffect } from 'react';
import { useState } from 'react';

/**
 * Represents a playing card.
 * @param {string} rank - Rank of the card.
 * @param {string} suit - Suit of the card.
 * @param {string} imagePath - Path for the card image.
 * @param {boolean} hidden - If the card is hidden or not.
 * @returns {JSX.Element} Card
 */
const Card = (props) => {
    const [apiResponse, setApiResponse] = useState('');

    // Path for the card image.
    const [imagePath, setImagePath] = useState(props.imagePath);
    // Image of the card when it's hidden => back of the card.
    const [hiddenImage, setHiddenImage] = useState();
    // Image of the card.
    const [image, setImage] = useState();

    // Initialize the images for two sides of the card.
    useEffect(() => {
        setHiddenImage(initImage('../assets/cards/card_back.svg'));
        setImage(initImage(imagePath));
    }, []);

    /**
     * Return the image by given path.
     * @param {string} path - Image path.
     * @return Image
     */
    const initImage = (path) => {
        switch (path) {
            case '../assets/cards/card_back.svg':
                return require('../assets/cards/card_back.svg').default;
            case '../assets/cards/ace_of_spades.svg':
                return require('../assets/cards/ace_of_spades.svg').default;
            case '../assets/cards/ace_of_diamonds.svg':
                return require('../assets/cards/ace_of_diamonds.svg').default;
            case '../assets/cards/ace_of_clubs.svg':
                return require('../assets/cards/ace_of_clubs.svg').default;
            case '../assets/cards/ace_of_hearts.svg':
                return require('../assets/cards/ace_of_hearts.svg').default;
            case '../assets/cards/2_of_spades.svg':
                return require('../assets/cards/2_of_spades.svg').default;
            case '../assets/cards/2_of_diamonds.svg':
                return require('../assets/cards/2_of_diamonds.svg').default;
            case '../assets/cards/2_of_clubs.svg':
                return require('../assets/cards/2_of_clubs.svg').default;
            case '../assets/cards/2_of_hearts.svg':
                return require('../assets/cards/2_of_hearts.svg').default;
            case '../assets/cards/3_of_spades.svg':
                return require('../assets/cards/3_of_spades.svg').default;
            case '../assets/cards/3_of_diamonds.svg':
                return require('../assets/cards/3_of_diamonds.svg').default;
            case '../assets/cards/3_of_clubs.svg':
                return require('../assets/cards/3_of_clubs.svg').default;
            case '../assets/cards/3_of_hearts.svg':
                return require('../assets/cards/3_of_hearts.svg').default;
            case '../assets/cards/4_of_spades.svg':
                return require('../assets/cards/4_of_spades.svg').default;
            case '../assets/cards/4_of_diamonds.svg':
                return require('../assets/cards/4_of_diamonds.svg').default;
            case '../assets/cards/4_of_clubs.svg':
                return require('../assets/cards/4_of_clubs.svg').default;
            case '../assets/cards/4_of_hearts.svg':
                return require('../assets/cards/4_of_hearts.svg').default;
            case '../assets/cards/5_of_spades.svg':
                return require('../assets/cards/5_of_spades.svg').default;
            case '../assets/cards/5_of_diamonds.svg':
                return require('../assets/cards/5_of_diamonds.svg').default;
            case '../assets/cards/5_of_clubs.svg':
                return require('../assets/cards/5_of_clubs.svg').default;
            case '../assets/cards/5_of_hearts.svg':
                return require('../assets/cards/5_of_hearts.svg').default;
            case '../assets/cards/6_of_spades.svg':
                return require('../assets/cards/6_of_spades.svg').default;
            case '../assets/cards/6_of_diamonds.svg':
                return require('../assets/cards/6_of_diamonds.svg').default;
            case '../assets/cards/6_of_clubs.svg':
                return require('../assets/cards/6_of_clubs.svg').default;
            case '../assets/cards/6_of_hearts.svg':
                return require('../assets/cards/6_of_hearts.svg').default;
            case '../assets/cards/7_of_spades.svg':
                return require('../assets/cards/7_of_spades.svg').default;
            case '../assets/cards/7_of_diamonds.svg':
                return require('../assets/cards/7_of_diamonds.svg').default;
            case '../assets/cards/7_of_clubs.svg':
                return require('../assets/cards/7_of_clubs.svg').default;
            case '../assets/cards/7_of_hearts.svg':
                return require('../assets/cards/7_of_hearts.svg').default;
            case '../assets/cards/8_of_spades.svg':
                return require('../assets/cards/8_of_spades.svg').default;
            case '../assets/cards/8_of_diamonds.svg':
                return require('../assets/cards/8_of_diamonds.svg').default;
            case '../assets/cards/8_of_clubs.svg':
                return require('../assets/cards/8_of_clubs.svg').default;
            case '../assets/cards/8_of_hearts.svg':
                return require('../assets/cards/8_of_hearts.svg').default;
            case '../assets/cards/9_of_spades.svg':
                return require('../assets/cards/9_of_spades.svg').default;
            case '../assets/cards/9_of_diamonds.svg':
                return require('../assets/cards/9_of_diamonds.svg').default;
            case '../assets/cards/9_of_clubs.svg':
                return require('../assets/cards/9_of_clubs.svg').default;
            case '../assets/cards/9_of_hearts.svg':
                return require('../assets/cards/9_of_hearts.svg').default;
            case '../assets/cards/10_of_spades.svg':
                return require('../assets/cards/10_of_spades.svg').default;
            case '../assets/cards/10_of_diamonds.svg':
                return require('../assets/cards/10_of_diamonds.svg').default;
            case '../assets/cards/10_of_clubs.svg':
                return require('../assets/cards/10_of_clubs.svg').default;
            case '../assets/cards/10_of_hearts.svg':
                return require('../assets/cards/10_of_hearts.svg').default;
            case '../assets/cards/jack_of_spades.svg':
                return require('../assets/cards/jack_of_spades.svg').default;
            case '../assets/cards/jack_of_diamonds.svg':
                return require('../assets/cards/jack_of_diamonds.svg').default;
            case '../assets/cards/jack_of_clubs.svg':
                return require('../assets/cards/jack_of_clubs.svg').default;
            case '../assets/cards/jack_of_hearts.svg':
                return require('../assets/cards/jack_of_hearts.svg').default;
            case '../assets/cards/queen_of_spades.svg':
                return require('../assets/cards/queen_of_spades.svg').default;
            case '../assets/cards/queen_of_diamonds.svg':
                return require('../assets/cards/queen_of_diamonds.svg').default;
            case '../assets/cards/queen_of_clubs.svg':
                return require('../assets/cards/queen_of_clubs.svg').default;
            case '../assets/cards/queen_of_hearts.svg':
                return require('../assets/cards/queen_of_hearts.svg').default;
            case '../assets/cards/king_of_spades.svg':
                return require('../assets/cards/king_of_spades.svg').default;
            case '../assets/cards/king_of_diamonds.svg':
                return require('../assets/cards/king_of_diamonds.svg').default;
            case '../assets/cards/king_of_clubs.svg':
                return require('../assets/cards/king_of_clubs.svg').default;
            case '../assets/cards/king_of_hearts.svg':
                return require('../assets/cards/king_of_hearts.svg').default;
            default:
                break;
        }
    };

    const rankToString = (rank) => {
        switch (rank) {
            case 'A':
                return 'ace';
            case 'J':
                return 'jack';
            case 'Q':
                return 'queen';
            case 'K':
                return 'king';
            default:
                return rank;
        }
    };

    return (
        <React.Fragment>
            {/* <img src={(props.hidden) ? hiddenImage : image} width='7%' height='7%' /> */}
            <img src={(props.hidden) ? '../assets/cards/card_back.svg' :
                '../assets/cards/' + rankToString(props.rank) + '_of_' + props.suit} width='7%' height='7%' />
        </React.Fragment>
    );
}

export default Card;
