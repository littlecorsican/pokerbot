export default class Hole {
    constructor() {
      this.cards = [null, null];
    }
  
    // Add a card to the hole (index 0 or 1)
    addCard(card, index) {
      if (index >= 0 && index < 2) {
        this.cards[index] = card;
      }
    }
  
    // Remove a card from the hole
    removeCard(index) {
      if (index >= 0 && index < 2) {
        this.cards[index] = null;
      }
    }
  
    // Get all valid (non-null) cards
    getValidCards() {
      return this.cards.filter(card => card !== null);
    }
  
    // Check if hole is full (has 2 cards)
    isFull() {
      return this.cards.every(card => card !== null);
    }
  
    // Check if hole is empty
    isEmpty() {
      return this.cards.every(card => card === null);
    }
  
    // Clear all cards from hole
    clear() {
      this.cards = [null, null];
    }
}