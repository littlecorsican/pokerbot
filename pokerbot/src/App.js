import React, { useState } from 'react';
import './App.css';

function App() {
  // Card ranks and suits
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const suits = ['♠', '♥', '♦', '♣'];
  
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

  // Function to render a card
  const renderCard = (card, cardIndex, cardType) => {
    if (card) {
      return (
        <div className="card selected-card">
          <div className="card-rank">{card.rank}</div>
          <div className="card-suit">{card.suit}</div>
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
          {allCards.map(card => (
            <div
              key={card.id}
              className="dropdown-card"
              onClick={() => handleCardSelect(card, cardIndexNum, cardType)}
            >
              <div className="card-rank">{card.rank}</div>
              <div className="card-suit">{card.suit}</div>
            </div>
          ))}
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
        <h1>Poker Table</h1>
        
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

        {/* Card Selection Dropdown */}
        {renderDropdown()}
      </div>
    </div>
  );
}

export default App;
