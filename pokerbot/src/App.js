import React, { useState, useEffect } from 'react';
import './App.css';
import { calculatePokerHandProbabilities, getCurrentHandStrength } from './services/calculate_rank';
import { calculateOuts } from './services/calculate_outs';
import ProbabilitySection from './components/ProbabilitySection';
import OutsSection from './components/OutsSection';
import OutsSection2 from './components/OutSection2';

function App() {
  // Card ranks and suits
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const suits = ['♠', '♥', '♦', '♣'];
  const red = ['♥', '♦'];
  const black = ['♠', '♣'];

  useEffect(() => {
    const table = calculateOuts();
    console.log("table", table);
    setTableData(table);
  }, []);
  
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

  // State for table data
  const [tableData, setTableData] = useState(null);

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
        <ProbabilitySection probabilities={probabilities} />

        {/* Outs Display */}
        <OutsSection outs={outs} tableData={tableData} />
        <OutsSection2 outs={outs} tableData={tableData} />

        {/* Card Selection Dropdown */}
        {renderDropdown()}
      </div>
    </div>
  );
}

export default App;
