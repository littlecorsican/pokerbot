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
  getRemaining(existingCards, remainingCommunityCards = 5) {
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
    
    // Filter out combinations that require more cards than available
    const filteredNeeded = remainingNeeded.filter(item => item.needed <= remainingCommunityCards);
    
    // Sort by number of cards needed (ascending)
    const sorted = filteredNeeded.sort((a, b) => a.needed - b.needed);
    
    // Group by ranks needed (ignoring suits) and fill suits as "*"
    const grouped = new Map();
    
    sorted.forEach(item => {
      // Create a key based on ranks only (ignoring suits)
      const rankKey = item.cards.map(card => card.rank).sort().join(',');
      
      if (!grouped.has(rankKey)) {
        // Fill suits as "*" for the first occurrence
        const cardsWithWildcardSuits = item.cards.map(card => ({
          rank: card.rank,
          suit: '*'
        }));
        
        grouped.set(rankKey, {
          needed: item.needed,
          cards: cardsWithWildcardSuits,
          combination: item.combination
        });
      }
    });
    
    // Convert back to array and keep only entries with the lowest "needed" count
    const result = Array.from(grouped.values());
    const minNeeded = result[0]?.needed;
    return result.filter(item => item.needed === minNeeded);
  }
}
