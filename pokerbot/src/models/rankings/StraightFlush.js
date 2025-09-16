export default class StraightFlush {
  constructor() {
    this.name = 'Straight Flush';
    this.rank = 9;
  }

  // Generate all possible straight flush combinations
  getPossibleCards() {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['♠', '♥', '♦', '♣'];
    
    const possibleCards = [];
    
    // Regular straight flushes (5 consecutive ranks of same suit)
    suits.forEach(suit => {
      for (let i = 0; i <= ranks.length - 5; i++) {
        const straightRanks = ranks.slice(i, i + 5);
        possibleCards.push(straightRanks.map(rank => ({ rank, suit })));
      }
      
      // A-2-3-4-5 straight flush (wheel)
      const wheelRanks = ['A', '2', '3', '4', '5'];
      possibleCards.push(wheelRanks.map(rank => ({ rank, suit })));
    });
    
    return possibleCards;
  }

  // Check if given cards form a straight flush
  isStraightFlush(cards) {
    // First check if it's a flush
    const suitCounts = {};
    cards.forEach(card => {
      suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    });
    
    const isFlush = Object.values(suitCounts).some(count => count >= 5);
    if (!isFlush) return false;
    
    // Then check if it's a straight
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

  // Get remaining cards needed to form straight flushes
  getRemaining(existingCards) {
    // If we already have a straight flush, return true
    if (this.isStraightFlush(existingCards)) {
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
