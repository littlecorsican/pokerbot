import Card from '../models/card';
import Hole from '../models/hole';
import Community from '../models/community';
import Deck from '../models/deck';



export const calculateOuts = () => {
    const deck = new Deck();
    const hole = new Hole();
    const community = new Community();

    deck.initializeDeck();
    console.log(deck.cards);
}
