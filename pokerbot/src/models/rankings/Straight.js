export default class Straight {
  constructor() {
    this.name = 'Straight';
    this.rank = 5;
  }

  // Generate all possible straight combinations
  getPossibleCards() {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['♠', '♥', '♦', '♣'];
    
    const possibleCards = [];
    
    // Regular straights (5 consecutive ranks)
    for (let i = 0; i <= ranks.length - 5; i++) {
      const straightRanks = ranks.slice(i, i + 5);
      
      // Generate all combinations with different suits
      suits.forEach(suit1 => {
        suits.forEach(suit2 => {
          suits.forEach(suit3 => {
            suits.forEach(suit4 => {
              suits.forEach(suit5 => {
                possibleCards.push([
                  { rank: straightRanks[0], suit: suit1 },
                  { rank: straightRanks[1], suit: suit2 },
                  { rank: straightRanks[2], suit: suit3 },
                  { rank: straightRanks[3], suit: suit4 },
                  { rank: straightRanks[4], suit: suit5 }
                ]);
              });
            });
          });
        });
      });
    }
    
    // A-2-3-4-5 straight (wheel)
    const wheelRanks = ['A', '2', '3', '4', '5'];
    suits.forEach(suit1 => {
      suits.forEach(suit2 => {
        suits.forEach(suit3 => {
          suits.forEach(suit4 => {
            suits.forEach(suit5 => {
              possibleCards.push([
                { rank: wheelRanks[0], suit: suit1 },
                { rank: wheelRanks[1], suit: suit2 },
                { rank: wheelRanks[2], suit: suit3 },
                { rank: wheelRanks[3], suit: suit4 },
                { rank: wheelRanks[4], suit: suit5 }
              ]);
            });
          });
        });
      });
    });
    
    return possibleCards;
  }

  // Check if given cards form a straight
  isStraight(cards) {
    const rankValues = cards.map(card => {
      if (card.rank === 'A') return 14;
      if (card.rank === 'K') return 13;
      if (card.rank === 'Q') return 12;
      if (card.rank === 'J') return 11;
      return parseInt(card.rank);
    }).sort((a, b) => a - b);
    
    // Check for regular straight
    for (let i = 0; i < rankValues.length - 4; i++) {
      let consecutive = true;
      for (let j = 1; j < 5; j++) {
        if (rankValues[i + j] !== rankValues[i] + j) {
          consecutive = false;
          break;
        }
      }
      if (consecutive) return true;
    }
    
    // Check for A-2-3-4-5 straight (wheel)
    if (rankValues.includes(14) && rankValues.includes(2) && 
        rankValues.includes(3) && rankValues.includes(4) && rankValues.includes(5)) {
      return true;
    }
    
    return false;
  }

  // Get remaining cards needed to form straights
  getRemaining(existingCards) {
    // If we already have a straight, return true
    if (this.isStraight(existingCards)) {
      return true;
    }

    console.log(this.getPossibleCards().length)

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
