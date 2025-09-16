export default class HighCard {
  constructor() {
    this.name = 'High Card';
    this.rank = 1;
  }

  // Generate all possible high card combinations
  getPossibleCards() {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['♠', '♥', '♦', '♣'];
    
    const possibleCards = [];
    
    // High card is any 5 cards that don't form any other hand
    // For simplicity, we'll generate all possible 5-card combinations
    // and filter out those that form other hands (this would be done in practice)
    
    suits.forEach(suit => {
      ranks.forEach(rank => {
        possibleCards.push({ rank, suit });
      });
    });
    
    return possibleCards;
  }

  // Check if given cards form a high card hand
  isHighCard(cards) {
    // High card is the default when no other hand is formed
    // This would typically be checked after all other hand types
    return true; // Simplified for this example
  }

  // Get remaining cards needed to form high card hands
  getRemaining(existingCards) {
    // If we already have a high card hand, return true
    if (this.isHighCard(existingCards)) {
      return true;
    }

    const possibleCombinations = this.getPossibleCards();
    const existingCardIds = existingCards.map(card => `${card.rank}${card.suit}`);
    
    const remainingNeeded = [];
    
    // Loop through all possible combinations
    possibleCombinations.forEach(combination => {
      const neededCards = combination.filter(card => 
        !existingCardIds.includes(`${card.rank}${card.suit}`)
      );
      
      if (neededCards.length > 0) {
        remainingNeeded.push({
          needed: neededCards.length,
          cards: neededCards,
          combination: combination
        });
      }
    });
    
    // Sort by number of cards needed (ascending)
    return remainingNeeded.sort((a, b) => a.needed - b.needed);
  }
}
