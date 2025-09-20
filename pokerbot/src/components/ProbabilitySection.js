import React from 'react';

const ProbabilitySection = ({ probabilities }) => {
  return (
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
  );
};

export default ProbabilitySection;
