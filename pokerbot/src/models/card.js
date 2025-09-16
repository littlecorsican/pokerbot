
export default class Card {
    constructor(rank, suit) {
      this.rank = rank;
      this.suit = suit;
    }
  
    // Get the numeric value of the card (A=14, K=13, Q=12, J=11, etc.)
    getValue() {
      if (this.rank === 'A') return 14;
      if (this.rank === 'K') return 13;
      if (this.rank === 'Q') return 12;
      if (this.rank === 'J') return 11;
      return parseInt(this.rank);
    }
  
    // Get string representation of the card
    toString() {
      return `${this.rank}-${this.suit}`;
    }
  
    // Check if this card equals another card
    equals(otherCard) {
      return this.rank === otherCard.rank && this.suit === otherCard.suit;
    }
}