import React from 'react';

const OutsSection = ({ outs }) => {
  // Function to render outs cards
  const renderOutsCard = (card) => {
    const red = ['♥', '♦'];
    const isRedSuit = red.includes(card.suit);
    return (
      <div className="outs-card" key={`${card.rank}${card.suit}`}>
        <div className={`card-rank ${isRedSuit ? 'red-suit' : 'black-suit'}`}>{card.rank}</div>
        <div className={`card-suit ${isRedSuit ? 'red-suit' : 'black-suit'}`}>{card.suit}</div>
      </div>
    );
  };

  return (
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
  );
};

export default OutsSection;
