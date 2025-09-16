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
}
