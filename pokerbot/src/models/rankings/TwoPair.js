export default class TwoPair {
  constructor() {
    this.name = 'Two Pair';
    this.rank = 3;
  }

  // Generate all possible two pair combinations
  getPossibleCards() {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['♠', '♥', '♦', '♣'];
    
    const possibleCards = [];
    
    // Generate all possible two pair combinations
    for (let i = 0; i < ranks.length; i++) {
      for (let j = i + 1; j < ranks.length; j++) {
        const rank1 = ranks[i];
        const rank2 = ranks[j];
        
        // Get all cards for each rank
        const rank1Cards = suits.map(suit => ({ rank: rank1, suit }));
        const rank2Cards = suits.map(suit => ({ rank: rank2, suit }));
        
        // Generate all combinations of 2 cards from each rank
        for (let k = 0; k < rank1Cards.length; k++) {
          for (let l = k + 1; l < rank1Cards.length; l++) {
            for (let m = 0; m < rank2Cards.length; m++) {
              for (let n = m + 1; n < rank2Cards.length; n++) {
                possibleCards.push([
                  rank1Cards[k], rank1Cards[l],
                  rank2Cards[m], rank2Cards[n]
                ]);
              }
            }
          }
        }
      }
    }
    
    return possibleCards;
  }

  // Check if given cards form two pair
  isTwoPair(cards) {
    const rankCounts = {};
    cards.forEach(card => {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    });
    
    const counts = Object.values(rankCounts);
    const pairCount = counts.filter(count => count === 2).length;
    
    return pairCount === 2;
  }
}
