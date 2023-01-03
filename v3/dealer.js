// import { Party } from "./party.js";

class Party {
    constructor(cards) {
        this.cards = cards
        this.maxCards = 7
    } 

    setCards(cards) {
        this.cards = cards
    }

    addToCards(cards) {
        this.cards.push(cards)
    }

    // calculate(type) {

    //     if (type == "Royal Flush") {

    //     } else if () {

    //     }

    // }

    create(type) { // type : string, cards : 2D array
        return dynamicClass(type, this.cards)
    }



}

class RoyalFlush extends Party{

    calculate() { // calculate possibility of royal flush
        console.log(this.cards)
        let remainingCards = this.maxCards - this.cards.length
        
        //create all possibilities of royal flush
        let royalFlushCombination = new Array(4).fill([]).map((value,index)=>{
            return [{rank:10,suit:index}, {rank:11,suit:index}, {rank:12,suit:index}, {rank:13,suit:index}, {rank:14,suit:index}]
        })
        console.log("this.cards", this.cards)
        console.log('royalFlushCombination1', royalFlushCombination)
        // let filteredCards=[]

        let cards = this.cards
        let index = 0
        let index2= 0
        let index3 = 0
        let royalFlushCombination2 = null
        let handRanking = null
        for (index in cards) {
            for (index2 in royalFlushCombination) {
                for (index3 in royalFlushCombination[index2]) {
                    //console.log(cards[index].value, royalFlushCombination[index2][index3].value)
                    if (cards[index].rank == royalFlushCombination[index2][index3].rank && this.cards[index].suit == royalFlushCombination[index2][index3].suit ) {
                        royalFlushCombination[index2].splice(index3, 1)
                        break
                    }
                }
            }
        }

        console.log('royalFlushCombination2', royalFlushCombination)

        royalFlushCombination2 = royalFlushCombination.map((x) => x);

        console.log('royalFlushCombination2', royalFlushCombination2)

        royalFlushCombination2 = royalFlushCombination2.filter((value)=>{
            return value.length <= remainingCards
        })

        console.log('royalFlushCombination2', royalFlushCombination2)

        handRanking = royalFlushCombination2
        console.log(handRanking)

    }
}


class StraightFlush extends Party{

    calculate() { // calculate possibility of straight flush
        console.log(this.cards)
        let remainingCards = this.maxCards - this.cards.length
        
        //create all possibilities of royal flush
        let royalFlushCombination = new Array(4).fill([]).map((value,index)=>{
            return [{rank:10,suit:index}, {rank:11,suit:index}, {rank:12,suit:index}, {rank:13,suit:index}, {rank:14,suit:index}]
        })
        console.log("this.cards", this.cards)
        console.log('royalFlushCombination1', royalFlushCombination)
        // let filteredCards=[]

        let cards = this.cards
        let index = 0
        let index2= 0
        let index3 = 0
        let royalFlushCombination2 = null
        let handRanking = null
        for (index in cards) {
            for (index2 in royalFlushCombination) {
                for (index3 in royalFlushCombination[index2]) {
                    //console.log(cards[index].value, royalFlushCombination[index2][index3].value)
                    if (cards[index].rank == royalFlushCombination[index2][index3].rank && this.cards[index].suit == royalFlushCombination[index2][index3].suit ) {
                        royalFlushCombination[index2].splice(index3, 1)
                        break
                    }
                }
            }
        }

        console.log('royalFlushCombination2', royalFlushCombination)

        royalFlushCombination2 = royalFlushCombination.map((x) => x);

        console.log('royalFlushCombination2', royalFlushCombination2)

        royalFlushCombination2 = royalFlushCombination2.filter((value)=>{
            return value.length <= remainingCards
        })

        console.log('royalFlushCombination2', royalFlushCombination2)

        handRanking = royalFlushCombination2
        console.log(handRanking)

}

class Dealer extends Party{

}

class Deck extends Party{


}

class Player extends Party{
      
}

const classes = { RoyalFlush, StraightFlush };

function dynamicClass (name, cards) {
  return new classes[name](cards);
}


//populate the deck
const deck = new Deck([])
console.log(deck.cards)
//const suits = ["spade", "heart", "diamond", "club"]
//const values = ["2", "3", "4", "5" , "6" , "7" , "8" , "9", "10", "J" , "Q" , "K", "A"]
const suits = ["0", "1", "2", "3"]
const values = ["1", "2", "3", "4", "5" , "6" , "7" , "8" , "9", "10", "11" , "12" , "13", "14"]

for (let i = 0 ; i < suits.length;i ++) {
    for (let o = 0 ; o < values.length;o ++) {
        deck.addToCards({ rank : values[o] , suit : suits[i] })
    }
}

const player = new Player([])
const dealer = new Dealer([])
//dealer.setCards([{rank:"Q", suit:"diamonds"} , {rank:"Q", suit:"diamonds"}])
dealer.setCards([{rank:"11", suit:"1"} , {rank:"12", suit:"1"}, {rank:"13", suit:"1"}])

newClass = dealer.create("RoyalFlush")
newClass.calculate()

