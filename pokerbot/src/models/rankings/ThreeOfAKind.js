export default class ThreeOfAKind {
  constructor() {
    this.name = 'Three of a Kind';
    this.rank = 4;
  }

  // Generate all possible three of a kind combinations
  getPossibleCards() {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['♠', '♥', '♦', '♣'];
    
    const possibleCards = [];
    
    // Generate all possible three of a kind combinations
    ranks.forEach(rank => {
      const rankCards = suits.map(suit => ({ rank, suit }));
      
      // Generate all combinations of 3 cards from the same rank
      for (let i = 0; i < rankCards.length; i++) {
        for (let j = i + 1; j < rankCards.length; j++) {
          for (let k = j + 1; k < rankCards.length; k++) {
            possibleCards.push([rankCards[i], rankCards[j], rankCards[k]]);
          }
        }
      }
    });
    
    return possibleCards;
  }

  // Check if given cards form three of a kind
  isThreeOfAKind(cards) {
    const rankCounts = {};
    cards.forEach(card => {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    });
    
    const counts = Object.values(rankCounts);
    return counts.includes(3) && !counts.includes(4);
  }

  // Get remaining cards needed to form three of a kind
  getRemaining(existingCards) {
    // If we already have three of a kind, return true
    if (this.isThreeOfAKind(existingCards)) {
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
    const sorted = remainingNeeded.sort((a, b) => a.needed - b.needed);
    
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
