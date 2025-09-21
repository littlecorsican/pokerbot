export default class FourOfAKind {
  constructor() {
    this.name = 'Four of a Kind';
    this.rank = 8;
  }

  // Generate all possible four of a kind combinations
  getPossibleCards() {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['♠', '♥', '♦', '♣'];
    
    const possibleCards = [];
    
    // Generate all possible four of a kind combinations
    ranks.forEach(rank => {
      const rankCards = suits.map(suit => ({ rank, suit }));
      
      // Four of a kind uses all 4 cards of the same rank
      possibleCards.push(rankCards);
    });
    
    return possibleCards;
  }

  // Check if given cards form four of a kind
  isFourOfAKind(cards) {
    const rankCounts = {};
    cards.forEach(card => {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    });
    
    const counts = Object.values(rankCounts);
    return counts.includes(4);
  }

  // Get remaining cards needed to form four of a kind
  getRemaining(existingCards, remainingCommunityCards = 5) {
    // If we already have four of a kind, return true
    if (this.isFourOfAKind(existingCards)) {
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
