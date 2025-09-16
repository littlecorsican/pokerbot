export default class FullHouse {
  constructor() {
    this.name = 'Full House';
    this.rank = 7;
  }

  // Generate all possible full house combinations
  getPossibleCards() {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['♠', '♥', '♦', '♣'];
    
    const possibleCards = [];
    
    // Generate all possible full house combinations (3 of one rank + 2 of another)
    for (let i = 0; i < ranks.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        if (i !== j) { // Different ranks
          const threeRank = ranks[i];
          const pairRank = ranks[j];
          
          // Get all cards for each rank
          const threeRankCards = suits.map(suit => ({ rank: threeRank, suit }));
          const pairRankCards = suits.map(suit => ({ rank: pairRank, suit }));
          
          // Generate all combinations of 3 cards from threeRank
          for (let k = 0; k < threeRankCards.length; k++) {
            for (let l = k + 1; l < threeRankCards.length; l++) {
              for (let m = l + 1; m < threeRankCards.length; m++) {
                // Generate all combinations of 2 cards from pairRank
                for (let n = 0; n < pairRankCards.length; n++) {
                  for (let o = n + 1; o < pairRankCards.length; o++) {
                    possibleCards.push([
                      threeRankCards[k], threeRankCards[l], threeRankCards[m],
                      pairRankCards[n], pairRankCards[o]
                    ]);
                  }
                }
              }
            }
          }
        }
      }
    }
    
    return possibleCards;
  }

  // Check if given cards form a full house
  isFullHouse(cards) {
    const rankCounts = {};
    cards.forEach(card => {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    });
    
    const counts = Object.values(rankCounts).sort((a, b) => b - a);
    return counts[0] === 3 && counts[1] === 2;
  }
}
