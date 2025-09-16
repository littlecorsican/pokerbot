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
}
