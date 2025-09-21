import Deck from './deck';
import Hole from './hole';
import Community from './community';

export default class Table {
  constructor() {
    this.deck = new Deck();
    this.hole = new Hole();
    this.community = new Community();
    this.rank = {};
  }


  // Reset the table (new hand)
  resetTable() {
    this.deck.reset();
    this.hole.clear();
    this.community.clear();
  }

  // Get all cards currently on the table
  getAllCards() {
    return {
      hole: this.hole.getValidCards(),
      community: this.community.getValidCards(),
      deck: this.deck.getRemainingCards()
    };
  }

  // Get table state information
  getTableState() {
    return {
      holeCards: this.hole.getValidCards().length,
      communityCards: this.community.getCardCount(),
      remainingDeck: this.deck.getRemainingCount(),
      isHoleFull: this.hole.isFull(),
      isCommunityFull: this.community.isFull(),
      isDeckEmpty: this.deck.isEmpty()
    };
  }

  // Manually add a card to hole (for testing/manual setup)
  addCardToHole(card, index) {
    this.hole.addCard(card, index);
    // Remove the card from deck if it exists there
    this.deck.removeCards([card]);
  }

  // Manually add a card to community (for testing/manual setup)
  addCardToCommunity(card, index) {
    this.community.addCard(card, index);
    // Remove the card from deck if it exists there
    this.deck.removeCards([card]);
  }

  // Remove a card from hole
  removeCardFromHole(index) {
    const removedCard = this.hole.cards[index];
    this.hole.removeCard(index);
    return removedCard;
  }

  // Remove a card from community
  removeCardFromCommunity(index) {
    const removedCard = this.community.cards[index];
    this.community.removeCard(index);
    return removedCard;
  }

  // Get all cards for hand evaluation (hole + community)
  getHandCards() {
    return [...this.hole.getValidCards(), ...this.community.getValidCards()];
  }

  // Get remaining cards that could be dealt
  getRemainingCards() {
    return this.deck.getRemainingCards();
  }

  // Get remaining community cards that can still be dealt (max 5 - current count)
  getRemainingCommunityCards() {
    const maxCommunityCards = 5;
    const currentCommunityCards = this.community.getCardCount();
    return maxCommunityCards - currentCommunityCards;
  }

  
  
}
