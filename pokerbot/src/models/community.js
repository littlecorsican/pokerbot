export default class Community {
    constructor() {
      this.cards = [null, null, null, null, null];
    }
  
    // Add a card to the community (index 0-4)
    addCard(card, index) {
      if (index >= 0 && index < 5) {
        this.cards[index] = card;
      }
    }
  
    // Remove a card from the community
    removeCard(index) {
      if (index >= 0 && index < 5) {
        this.cards[index] = null;
      }
    }
  
    // Get all valid (non-null) cards
    getValidCards() {
      return this.cards.filter(card => card !== null);
    }
  
    // Get the number of cards currently in community
    getCardCount() {
      return this.getValidCards().length;
    }
  
    // Check if community is full (has 5 cards)
    isFull() {
      return this.cards.every(card => card !== null);
    }
  
    // Check if community is empty
    isEmpty() {
      return this.cards.every(card => card === null);
    }
  
    // Clear all cards from community
    clear() {
      this.cards = [null, null, null, null, null];
    }
}
  