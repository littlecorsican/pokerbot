import Card from './card';

export default class Deck {
    constructor() {
      this.cards = [];
      this.initializeDeck();
    }
  
    // Initialize the deck with all 52 standard playing cards
    initializeDeck() {
      const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
      const suits = ['♠', '♥', '♦', '♣'];
      
      this.cards = [];
      suits.forEach(suit => {
        ranks.forEach(rank => {
          this.cards.push(new Card(rank, suit));
        });
      });
    }

  
    // Get the number of cards remaining in the deck
    getRemainingCount() {
      return this.cards.length;
    }
  
    // Check if deck is empty
    isEmpty() {
      return this.cards.length === 0;
    }
  
    // Reset the deck to full 52 cards
    reset() {
      this.initializeDeck();
    }
  
    // Remove specific cards from the deck (useful when cards are dealt)
    removeCards(cardsToRemove) {
      this.cards = this.cards.filter(card => 
        !cardsToRemove.some(removeCard => card.equals(removeCard))
      );
    }
  
    // Get all remaining cards in the deck
    getRemainingCards() {
      return [...this.cards];
    }
}
