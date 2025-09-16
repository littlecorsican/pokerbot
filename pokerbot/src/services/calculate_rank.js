// Poker hand probability calculator
// Takes community cards (3-5 cards) and user cards (2 cards)
// Returns probabilities for each poker hand when remaining cards are dealt

// Poker hand rankings (higher number = better hand)
const HAND_RANKINGS = {
  HIGH_CARD: 1,
  PAIR: 2,
  TWO_PAIR: 3,
  THREE_OF_A_KIND: 4,
  STRAIGHT: 5,
  FLUSH: 6,
  FULL_HOUSE: 7,
  FOUR_OF_A_KIND: 8,
  STRAIGHT_FLUSH: 9,
  ROYAL_FLUSH: 10
};

// Card ranks and suits
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS = ['♠', '♥', '♦', '♣'];

// Helper function to get rank value (A=14, K=13, Q=12, J=11, etc.)
function getRankValue(rank) {
  if (rank === 'A') return 14;
  if (rank === 'K') return 13;
  if (rank === 'Q') return 12;
  if (rank === 'J') return 11;
  return parseInt(rank);
}

// Helper function to check if cards form a straight
function isStraight(ranks) {
  const values = ranks.map(getRankValue).sort((a, b) => a - b);
  
  // Check for regular straight
  for (let i = 0; i < values.length - 4; i++) {
    let consecutive = true;
    for (let j = 1; j < 5; j++) {
      if (values[i + j] !== values[i] + j) {
        consecutive = false;
        break;
      }
    }
    if (consecutive) return true;
  }
  
  // Check for A-2-3-4-5 straight (wheel)
  if (values.includes(14) && values.includes(2) && values.includes(3) && 
      values.includes(4) && values.includes(5)) {
    return true;
  }
  
  return false;
}

// Helper function to check if cards form a flush
function isFlush(suits) {
  const suitCounts = {};
  suits.forEach(suit => {
    suitCounts[suit] = (suitCounts[suit] || 0) + 1;
  });
  return Object.values(suitCounts).some(count => count >= 5);
}

// Helper function to get the best 5-card hand from 7 cards
function getBestHand(cards) {
  if (cards.length < 5) return null;
  
  const ranks = cards.map(card => card.rank);
  const suits = cards.map(card => card.suit);
  
  // Count rank occurrences
  const rankCounts = {};
  ranks.forEach(rank => {
    rankCounts[rank] = (rankCounts[rank] || 0) + 1;
  });
  
  const counts = Object.values(rankCounts).sort((a, b) => b - a);
  const isStraightHand = isStraight(ranks);
  const isFlushHand = isFlush(suits);
  
  // Royal Flush
  if (isStraightHand && isFlushHand) {
    const values = ranks.map(getRankValue).sort((a, b) => a - b);
    if (values.includes(14) && values.includes(13) && values.includes(12) && 
        values.includes(11) && values.includes(10)) {
      return HAND_RANKINGS.ROYAL_FLUSH;
    }
  }
  
  // Straight Flush
  if (isStraightHand && isFlushHand) {
    return HAND_RANKINGS.STRAIGHT_FLUSH;
  }
  
  // Four of a Kind
  if (counts[0] === 4) {
    return HAND_RANKINGS.FOUR_OF_A_KIND;
  }
  
  // Full House
  if (counts[0] === 3 && counts[1] === 2) {
    return HAND_RANKINGS.FULL_HOUSE;
  }
  
  // Flush
  if (isFlushHand) {
    return HAND_RANKINGS.FLUSH;
  }
  
  // Straight
  if (isStraightHand) {
    return HAND_RANKINGS.STRAIGHT;
  }
  
  // Three of a Kind
  if (counts[0] === 3) {
    return HAND_RANKINGS.THREE_OF_A_KIND;
  }
  
  // Two Pair
  if (counts[0] === 2 && counts[1] === 2) {
    return HAND_RANKINGS.TWO_PAIR;
  }
  
  // Pair
  if (counts[0] === 2) {
    return HAND_RANKINGS.PAIR;
  }
  
  // High Card
  return HAND_RANKINGS.HIGH_CARD;
}

// Function to calculate outs for each hand type
function calculateOuts(communityCards, userCards) {
  const validCommunityCards = communityCards.filter(card => card !== null);
  const validUserCards = userCards.filter(card => card !== null);
  
  if (validCommunityCards.length === 0 || validUserCards.length === 0) {
    return {
      royalFlush: [],
      straightFlush: [],
      fourOfAKind: [],
      fullHouse: [],
      flush: [],
      straight: [],
      threeOfAKind: [],
      twoPair: [],
      pair: [],
      highCard: []
    };
  }
  
  const allCards = [...validCommunityCards, ...validUserCards];
  const usedCardIds = allCards.map(card => `${card.rank}${card.suit}`);
  
  // Generate all remaining cards
  const remainingCards = [];
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      const cardId = `${rank}${suit}`;
      if (!usedCardIds.includes(cardId)) {
        remainingCards.push({ rank, suit });
      }
    });
  });
  
  const outs = {
    royalFlush: [],
    straightFlush: [],
    fourOfAKind: [],
    fullHouse: [],
    flush: [],
    straight: [],
    threeOfAKind: [],
    twoPair: [],
    pair: [],
    highCard: []
  };
  
  // Calculate outs for each hand type
  remainingCards.forEach(card => {
    const testCards = [...allCards, card];
    const handRank = getBestHand(testCards);
    
    switch (handRank) {
      case HAND_RANKINGS.ROYAL_FLUSH:
        outs.royalFlush.push(card);
        break;
      case HAND_RANKINGS.STRAIGHT_FLUSH:
        outs.straightFlush.push(card);
        break;
      case HAND_RANKINGS.FOUR_OF_A_KIND:
        outs.fourOfAKind.push(card);
        break;
      case HAND_RANKINGS.FULL_HOUSE:
        outs.fullHouse.push(card);
        break;
      case HAND_RANKINGS.FLUSH:
        outs.flush.push(card);
        break;
      case HAND_RANKINGS.STRAIGHT:
        outs.straight.push(card);
        break;
      case HAND_RANKINGS.THREE_OF_A_KIND:
        outs.threeOfAKind.push(card);
        break;
      case HAND_RANKINGS.TWO_PAIR:
        outs.twoPair.push(card);
        break;
      case HAND_RANKINGS.PAIR:
        outs.pair.push(card);
        break;
      case HAND_RANKINGS.HIGH_CARD:
        outs.highCard.push(card);
        break;
    }
  });
  
  return outs;
}

// Main function to calculate poker hand probabilities
export function calculatePokerHandProbabilities(communityCards, userCards) {
  // Validate input
  if (!Array.isArray(communityCards) || !Array.isArray(userCards)) {
    throw new Error('Both communityCards and userCards must be arrays');
  }
  
  if (communityCards.length < 3 || communityCards.length > 5) {
    throw new Error('Community cards must be between 3 and 5 cards');
  }
  
  if (userCards.length !== 2) {
    throw new Error('User cards must be exactly 2 cards');
  }
  
  // Filter out null cards
  const validCommunityCards = communityCards.filter(card => card !== null);
  const validUserCards = userCards.filter(card => card !== null);
  
  if (validCommunityCards.length === 0 || validUserCards.length === 0) {
    return {
      probabilities: {
        royalFlush: 0,
        straightFlush: 0,
        fourOfAKind: 0,
        fullHouse: 0,
        flush: 0,
        straight: 0,
        threeOfAKind: 0,
        twoPair: 0,
        pair: 0,
        highCard: 0
      },
      outs: {
        royalFlush: [],
        straightFlush: [],
        fourOfAKind: [],
        fullHouse: [],
        flush: [],
        straight: [],
        threeOfAKind: [],
        twoPair: [],
        pair: [],
        highCard: []
      }
    };
  }
  
  // Get all used cards
  const usedCards = [...validCommunityCards, ...validUserCards];
  const usedCardIds = usedCards.map(card => `${card.rank}${card.suit}`);
  
  // Generate all remaining cards
  const remainingCards = [];
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      const cardId = `${rank}${suit}`;
      if (!usedCardIds.includes(cardId)) {
        remainingCards.push({ rank, suit });
      }
    });
  });
  
  // Calculate how many cards need to be dealt
  const cardsToDeal = 5 - validCommunityCards.length;
  
  if (cardsToDeal <= 0) {
    // All community cards are already dealt, just evaluate current hand
    const currentHand = getBestHand([...validCommunityCards, ...validUserCards]);
    const probabilities = {
      royalFlush: 0,
      straightFlush: 0,
      fourOfAKind: 0,
      fullHouse: 0,
      flush: 0,
      straight: 0,
      threeOfAKind: 0,
      twoPair: 0,
      pair: 0,
      highCard: 0
    };
    
    if (currentHand === HAND_RANKINGS.ROYAL_FLUSH) probabilities.royalFlush = 100;
    else if (currentHand === HAND_RANKINGS.STRAIGHT_FLUSH) probabilities.straightFlush = 100;
    else if (currentHand === HAND_RANKINGS.FOUR_OF_A_KIND) probabilities.fourOfAKind = 100;
    else if (currentHand === HAND_RANKINGS.FULL_HOUSE) probabilities.fullHouse = 100;
    else if (currentHand === HAND_RANKINGS.FLUSH) probabilities.flush = 100;
    else if (currentHand === HAND_RANKINGS.STRAIGHT) probabilities.straight = 100;
    else if (currentHand === HAND_RANKINGS.THREE_OF_A_KIND) probabilities.threeOfAKind = 100;
    else if (currentHand === HAND_RANKINGS.TWO_PAIR) probabilities.twoPair = 100;
    else if (currentHand === HAND_RANKINGS.PAIR) probabilities.pair = 100;
    else probabilities.highCard = 100;
    
    // Calculate outs for current situation
    const outs = calculateOuts(communityCards, userCards);
    
    return { probabilities, outs };
  }
  
  // Generate all possible combinations of remaining cards
  const combinations = generateCombinations(remainingCards, cardsToDeal);
  
  // Count hand outcomes
  const handCounts = {
    royalFlush: 0,
    straightFlush: 0,
    fourOfAKind: 0,
    fullHouse: 0,
    flush: 0,
    straight: 0,
    threeOfAKind: 0,
    twoPair: 0,
    pair: 0,
    highCard: 0
  };
  
  combinations.forEach(combination => {
    const allCards = [...validCommunityCards, ...validUserCards, ...combination];
    const handRank = getBestHand(allCards);
    
    switch (handRank) {
      case HAND_RANKINGS.ROYAL_FLUSH:
        handCounts.royalFlush++;
        break;
      case HAND_RANKINGS.STRAIGHT_FLUSH:
        handCounts.straightFlush++;
        break;
      case HAND_RANKINGS.FOUR_OF_A_KIND:
        handCounts.fourOfAKind++;
        break;
      case HAND_RANKINGS.FULL_HOUSE:
        handCounts.fullHouse++;
        break;
      case HAND_RANKINGS.FLUSH:
        handCounts.flush++;
        break;
      case HAND_RANKINGS.STRAIGHT:
        handCounts.straight++;
        break;
      case HAND_RANKINGS.THREE_OF_A_KIND:
        handCounts.threeOfAKind++;
        break;
      case HAND_RANKINGS.TWO_PAIR:
        handCounts.twoPair++;
        break;
      case HAND_RANKINGS.PAIR:
        handCounts.pair++;
        break;
      case HAND_RANKINGS.HIGH_CARD:
        handCounts.highCard++;
        break;
    }
  });
  
  // Convert counts to percentages
  const totalCombinations = combinations.length;
  const probabilities = {};
  
  Object.keys(handCounts).forEach(hand => {
    probabilities[hand] = totalCombinations > 0 ? 
      Math.round((handCounts[hand] / totalCombinations) * 100 * 100) / 100 : 0;
  });
  
  // Calculate outs for current situation
  const outs = calculateOuts(communityCards, userCards);
  
  return { probabilities, outs };
}

// Helper function to generate combinations
function generateCombinations(arr, k) {
  if (k === 0) return [[]];
  if (k > arr.length) return [];
  
  const result = [];
  
  function backtrack(start, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  
  backtrack(0, []);
  return result;
}

// Helper function to get current hand strength
export function getCurrentHandStrength(communityCards, userCards) {
  const validCommunityCards = communityCards.filter(card => card !== null);
  const validUserCards = userCards.filter(card => card !== null);
  
  if (validCommunityCards.length === 0 || validUserCards.length === 0) {
    return 'No cards selected';
  }
  
  const allCards = [...validCommunityCards, ...validUserCards];
  const handRank = getBestHand(allCards);
  
  const handNames = {
    [HAND_RANKINGS.ROYAL_FLUSH]: 'Royal Flush',
    [HAND_RANKINGS.STRAIGHT_FLUSH]: 'Straight Flush',
    [HAND_RANKINGS.FOUR_OF_A_KIND]: 'Four of a Kind',
    [HAND_RANKINGS.FULL_HOUSE]: 'Full House',
    [HAND_RANKINGS.FLUSH]: 'Flush',
    [HAND_RANKINGS.STRAIGHT]: 'Straight',
    [HAND_RANKINGS.THREE_OF_A_KIND]: 'Three of a Kind',
    [HAND_RANKINGS.TWO_PAIR]: 'Two Pair',
    [HAND_RANKINGS.PAIR]: 'Pair',
    [HAND_RANKINGS.HIGH_CARD]: 'High Card'
  };
  
  return handNames[handRank] || 'Unknown';
}
