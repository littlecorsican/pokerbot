export default class Flush {
  constructor() {
    this.name = 'Flush';
    this.rank = 6;
  }

  // Generate all possible flush combinations
  getPossibleCards() {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['♠', '♥', '♦', '♣'];
    
    const possibleCards = [];
    
    // Generate all possible flush combinations (5 cards of same suit)
    suits.forEach(suit => {
      // Generate all combinations of 5 cards from the same suit
      for (let i = 0; i < ranks.length; i++) {
        for (let j = i + 1; j < ranks.length; j++) {
          for (let k = j + 1; k < ranks.length; k++) {
            for (let l = k + 1; l < ranks.length; l++) {
              for (let m = l + 1; m < ranks.length; m++) {
                possibleCards.push([
                  { rank: ranks[i], suit },
                  { rank: ranks[j], suit },
                  { rank: ranks[k], suit },
                  { rank: ranks[l], suit },
                  { rank: ranks[m], suit }
                ]);
              }
            }
          }
        }
      }
    });
    
    return possibleCards;
  }

  // Check if given cards form a flush
  isFlush(cards) {
    console.log('Cards:', cards);
    const suitCounts = {};
    cards.forEach(card => {
      suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    });
    console.log('Suit counts:', suitCounts);
    return Object.values(suitCounts).some(count => count >= 5);
  }

  // Get remaining cards needed to form flushes
  getRemaining(existingCards) {
    // If we already have a flush, return true
    if (this.isFlush(existingCards)) {
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
