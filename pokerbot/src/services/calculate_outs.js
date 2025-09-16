import Table from '../models/table';

import Card from '../models/card';

export const calculateOuts = () => {
    const table = new Table();
    
    // Create specific cards: 2, 4, 6 for community
    const communityCards = [
        new Card('2', '♠'),
        new Card('4', '♠'), 
        new Card('6', '♠')
    ];
    
    // Add community cards and remove from deck
    table.community.addCard(communityCards[0], 0); // 2
    table.community.addCard(communityCards[1], 1); // 4
    table.community.addCard(communityCards[2], 2); // 6
    table.deck.removeCards(communityCards);
    
    // Create specific cards: 3, 10 for hole
    const holeCards = [
        new Card('3', '♠'),
        new Card('10', '♠')
    ];
    
    // Add hole cards and remove from dec
    table.hole.addCard(holeCards[0], 0); // 3
    table.hole.addCard(holeCards[1], 1); // 10
    table.deck.removeCards(holeCards);
    
    console.log('Hole Cards:', holeCards);
    console.log('Community Cards:', communityCards);
    console.log('All Cards on Table:', table.getAllCards());
    console.log('Table State:', table.getTableState());
    
    return table;
}
