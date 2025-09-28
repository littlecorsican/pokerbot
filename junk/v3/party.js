import RoyalFlush from './royalflush.js'
import StraightFlush from './straightflush.js'

export default class Party {
    constructor(cards) {
        this.cards = cards
    } 

    setCards(cards) {
        this.cards = cards
    }

    addToCards(cards) {
        this.cards = this.cards.push(cards)
    }

    // calculate(type) {

    //     if (type == "Royal Flush") {

    //     } else if () {

    //     }

    // }

    calculate(type) {
        x = dynamicClass("RoyalFlush")

    }



}




const classes = { RoyalFlush, StraightFlush };

function dynamicClass (name) {
  return classes[name];
}