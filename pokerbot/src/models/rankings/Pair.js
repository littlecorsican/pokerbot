export default class Pair {
  constructor() {
    this.name = 'Pair';
    this.rank = 2;
  }

  // Generate all possible pair combinations
  getPossibleCards() {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['♠', '♥', '♦', '♣'];
    
    const possibleCards = [];
    
    // Generate all possible pairs (same rank, different suits)
    ranks.forEach(rank => {
      const pairCards = [];
      suits.forEach(suit => {
        pairCards.push({ rank, suit });
      });
      
      // Add all combinations of 2 cards from the same rank
      for (let i = 0; i < pairCards.length; i++) {
        for (let j = i + 1; j < pairCards.length; j++) {
          possibleCards.push([pairCards[i], pairCards[j]]);
        }
      }
    });
    
    return possibleCards;
  }

  // Check if given cards form a pair
  isPair(cards) {
    const rankCounts = {};
    cards.forEach(card => {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    });
    
    const counts = Object.values(rankCounts);
    return counts.includes(2) && !counts.includes(3) && !counts.includes(4);
  }

  // Get remaining cards needed to form pairs
  getRemaining(existingCards, remainingCommunityCards = 5) {
    // If we already have a pair, return true
    if (this.isPair(existingCards)) {
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
