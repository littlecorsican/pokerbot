import React, { useState, useEffect } from 'react';
import './App.css';
import { calculatePokerHandProbabilities, getCurrentHandStrength } from './services/calculate_rank';

function App() {
  // Card ranks and suits
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const suits = ['♠', '♥', '♦', '♣'];
  const red = ['♥', '♦'];
  const black = ['♠', '♣'];
  
  // Generate all possible cards
  const allCards = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      allCards.push({ rank, suit, id: `${rank}${suit}` });
    });
  });

  // State for community cards (5 cards on table)
  const [communityCards, setCommunityCards] = useState([
    null, null, null, null, null
  ]);

  // State for player cards (2 cards)
  const [playerCards, setPlayerCards] = useState([
    null, null
  ]);

  // State for dropdown visibility
  const [showDropdown, setShowDropdown] = useState(null);

  // State for poker hand probabilities
  const [probabilities, setProbabilities] = useState({
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
  });

  // State for outs (cards needed to form each hand)
  const [outs, setOuts] = useState({
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
  });

  // State for current hand strength
  const [currentHand, setCurrentHand] = useState('No cards selected');

  // Effect to calculate probabilities when cards change
  useEffect(() => {
    try {
      const result = calculatePokerHandProbabilities(communityCards, playerCards);
      setProbabilities(result.probabilities);
      setOuts(result.outs);
      
      const newCurrentHand = getCurrentHandStrength(communityCards, playerCards);
      setCurrentHand(newCurrentHand);
    } catch (error) {
      console.error('Error calculating probabilities:', error);
      // Reset to default values on error
      setProbabilities({
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
      });
      setOuts({
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
      });
      setCurrentHand('Error calculating hand');
    }
  }, [communityCards, playerCards]);

  // Function to handle card selection
  const handleCardSelect = (card, cardIndex, cardType) => {
    if (cardType === 'community') {
      const newCommunityCards = [...communityCards];
      newCommunityCards[cardIndex] = card;
      setCommunityCards(newCommunityCards);
    } else if (cardType === 'player') {
      const newPlayerCards = [...playerCards];
      newPlayerCards[cardIndex] = card;
      setPlayerCards(newPlayerCards);
    }
    setShowDropdown(null);
  };

  // Function to handle card click
  const handleCardClick = (cardIndex, cardType) => {
    setShowDropdown(`${cardType}-${cardIndex}`);
  };

  // Function to clear all cards
  const handleClearAll = () => {
    setCommunityCards([null, null, null, null, null]);
    setPlayerCards([null, null]);
    setShowDropdown(null);
  };

  // Function to render a card
  const renderCard = (card, cardIndex, cardType) => {
    if (card) {
      const isRedSuit = red.includes(card.suit);
      return (
        <div className="card selected-card">
          <div className={`card-rank ${isRedSuit ? 'red-suit' : 'black-suit'}`}>{card.rank}</div>
          <div className={`card-suit ${isRedSuit ? 'red-suit' : 'black-suit'}`}>{card.suit}</div>
        </div>
      );
    } else {
      return (
        <div 
          className="card empty-card" 
          onClick={() => handleCardClick(cardIndex, cardType)}
        >
          <div className="card-placeholder">+</div>
        </div>
      );
    }
  };

  // Function to render outs cards
  const renderOutsCard = (card) => {
    const isRedSuit = red.includes(card.suit);
    return (
      <div className="outs-card" key={`${card.rank}${card.suit}`}>
        <div className={`card-rank ${isRedSuit ? 'red-suit' : 'black-suit'}`}>{card.rank}</div>
        <div className={`card-suit ${isRedSuit ? 'red-suit' : 'black-suit'}`}>{card.suit}</div>
      </div>
    );
  };

  // Function to render dropdown
  const renderDropdown = () => {
    if (!showDropdown) return null;

    const [cardType, cardIndex] = showDropdown.split('-');
    const cardIndexNum = parseInt(cardIndex);

    return (
      <div className="card-dropdown">
        <div className="dropdown-header">Select a Card</div>
        <div className="dropdown-grid">
          {allCards.map(card => {
            const isRedSuit = red.includes(card.suit);
            return (
              <div
                key={card.id}
                className="dropdown-card"
                onClick={() => handleCardSelect(card, cardIndexNum, cardType)}
              >
                <div className={`card-rank ${isRedSuit ? 'red-suit' : 'black-suit'}`}>{card.rank}</div>
                <div className={`card-suit ${isRedSuit ? 'red-suit' : 'black-suit'}`}>{card.suit}</div>
              </div>
            );
          })}
        </div>
        <button 
          className="close-dropdown"
          onClick={() => setShowDropdown(null)}
        >
          Close
        </button>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="poker-table">
        <div className="table-header">
          <h1>Poker Table</h1>
          <button className="clear-button" onClick={handleClearAll}>
            Clear All Cards
          </button>
        </div>
        
        {/* Community Cards (5 cards on table) */}
        <div className="community-cards-section">
          <h2>Community Cards</h2>
          <div className="community-cards">
            {communityCards.map((card, index) => (
              <div key={index} className="card-container">
                {renderCard(card, index, 'community')}
              </div>
            ))}
          </div>
        </div>

        {/* Player Cards (2 cards) */}
        <div className="player-cards-section">
          <h2>Your Cards</h2>
          <div className="player-cards">
            {playerCards.map((card, index) => (
              <div key={index} className="card-container">
                {renderCard(card, index, 'player')}
              </div>
            ))}
          </div>
        </div>

        {/* Current Hand Display */}
        <div className="current-hand-section">
          <h2>Current Hand</h2>
          <div className="current-hand-display">
            {currentHand}
          </div>
        </div>

        {/* Probability Display */}
        <div className="probability-section">
          <h2>Hand Probabilities</h2>
          <div className="probability-grid">
            <div className="probability-item">
              <span className="hand-name">Royal Flush</span>
              <span className="probability-value">{probabilities.royalFlush}%</span>
            </div>
            <div className="probability-item">
              <span className="hand-name">Straight Flush</span>
              <span className="probability-value">{probabilities.straightFlush}%</span>
            </div>
            <div className="probability-item">
              <span className="hand-name">Four of a Kind</span>
              <span className="probability-value">{probabilities.fourOfAKind}%</span>
            </div>
            <div className="probability-item">
              <span className="hand-name">Full House</span>
              <span className="probability-value">{probabilities.fullHouse}%</span>
            </div>
            <div className="probability-item">
              <span className="hand-name">Flush</span>
              <span className="probability-value">{probabilities.flush}%</span>
            </div>
            <div className="probability-item">
              <span className="hand-name">Straight</span>
              <span className="probability-value">{probabilities.straight}%</span>
            </div>
            <div className="probability-item">
              <span className="hand-name">Three of a Kind</span>
              <span className="probability-value">{probabilities.threeOfAKind}%</span>
            </div>
            <div className="probability-item">
              <span className="hand-name">Two Pair</span>
              <span className="probability-value">{probabilities.twoPair}%</span>
            </div>
            <div className="probability-item">
              <span className="hand-name">Pair</span>
              <span className="probability-value">{probabilities.pair}%</span>
            </div>
            <div className="probability-item">
              <span className="hand-name">High Card</span>
              <span className="probability-value">{probabilities.highCard}%</span>
            </div>
          </div>
        </div>

        {/* Outs Display */}
        <div className="outs-section">
          <h2>Outs (Cards Needed)</h2>
          <div className="outs-grid">
            <div className="outs-item">
              <div className="outs-header">
                <span className="hand-name">Royal Flush</span>
                <span className="outs-count">({outs.royalFlush.length} cards)</span>
              </div>
              <div className="outs-cards">
                {outs.royalFlush.map(renderOutsCard)}
              </div>
            </div>
            <div className="outs-item">
              <div className="outs-header">
                <span className="hand-name">Straight Flush</span>
                <span className="outs-count">({outs.straightFlush.length} cards)</span>
              </div>
              <div className="outs-cards">
                {outs.straightFlush.map(renderOutsCard)}
              </div>
            </div>
            <div className="outs-item">
              <div className="outs-header">
                <span className="hand-name">Four of a Kind</span>
                <span className="outs-count">({outs.fourOfAKind.length} cards)</span>
              </div>
              <div className="outs-cards">
                {outs.fourOfAKind.map(renderOutsCard)}
              </div>
            </div>
            <div className="outs-item">
              <div className="outs-header">
                <span className="hand-name">Full House</span>
                <span className="outs-count">({outs.fullHouse.length} cards)</span>
              </div>
              <div className="outs-cards">
                {outs.fullHouse.map(renderOutsCard)}
              </div>
            </div>
            <div className="outs-item">
              <div className="outs-header">
                <span className="hand-name">Flush</span>
                <span className="outs-count">({outs.flush.length} cards)</span>
              </div>
              <div className="outs-cards">
                {outs.flush.map(renderOutsCard)}
              </div>
            </div>
            <div className="outs-item">
              <div className="outs-header">
                <span className="hand-name">Straight</span>
                <span className="outs-count">({outs.straight.length} cards)</span>
              </div>
              <div className="outs-cards">
                {outs.straight.map(renderOutsCard)}
              </div>
            </div>
            <div className="outs-item">
              <div className="outs-header">
                <span className="hand-name">Three of a Kind</span>
                <span className="outs-count">({outs.threeOfAKind.length} cards)</span>
              </div>
              <div className="outs-cards">
                {outs.threeOfAKind.map(renderOutsCard)}
              </div>
            </div>
            <div className="outs-item">
              <div className="outs-header">
                <span className="hand-name">Two Pair</span>
                <span className="outs-count">({outs.twoPair.length} cards)</span>
              </div>
              <div className="outs-cards">
                {outs.twoPair.map(renderOutsCard)}
              </div>
            </div>
            <div className="outs-item">
              <div className="outs-header">
                <span className="hand-name">Pair</span>
                <span className="outs-count">({outs.pair.length} cards)</span>
              </div>
              <div className="outs-cards">
                {outs.pair.map(renderOutsCard)}
              </div>
            </div>
            <div className="outs-item">
              <div className="outs-header">
                <span className="hand-name">High Card</span>
                <span className="outs-count">({outs.highCard.length} cards)</span>
              </div>
              <div className="outs-cards">
                {outs.highCard.map(renderOutsCard)}
              </div>
            </div>
          </div>
        </div>

        {/* Card Selection Dropdown */}
        {renderDropdown()}
      </div>
    </div>
  );
}

export default App;
