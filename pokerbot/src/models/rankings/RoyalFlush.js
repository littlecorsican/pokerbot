export default class RoyalFlush {
  constructor() {
    this.name = 'Royal Flush';
    this.rank = 10;
  }

  // Generate all possible royal flush combinations
  getPossibleCards() {
    const suits = ['♠', '♥', '♦', '♣'];
    const royalRanks = ['10', 'J', 'Q', 'K', 'A'];
    
    const possibleCards = [];
    
    // Royal flush is A-K-Q-J-10 of the same suit
    suits.forEach(suit => {
      possibleCards.push(royalRanks.map(rank => ({ rank, suit })));
    });
    
    return possibleCards;
  }

  // Check if given cards form a royal flush
  isRoyalFlush(cards) {
    // First check if it's a straight flush
    const suitCounts = {};
    cards.forEach(card => {
      suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    });
    
    const isFlush = Object.values(suitCounts).some(count => count >= 5);
    if (!isFlush) return false;
    
    // Then check if it contains the royal ranks
    const ranks = cards.map(card => card.rank);
    const royalRanks = ['10', 'J', 'Q', 'K', 'A'];
    
    return royalRanks.every(rank => ranks.includes(rank));
  }
}
