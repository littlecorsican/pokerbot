import Table from '../models/table';
import { Flush,
    Straight,
    Pair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    StraightFlush,
    RoyalFlush
} from '../models/rankings/index';
import Card from '../models/card';

export const calculateOuts = () => {
    const table = new Table();
    
    // Create specific cards: 2, 4, 6 for community
    const communityCards = [
        new Card('2', '♠'),
        new Card('4', '♠'), 
        new Card('6', '♦')
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
    console.log('All Cards at Hand:', table.getHandCards());
    console.log('Table State:', table.getTableState());
    console.log('Flush:', new Flush().isFlush(table.getHandCards()));
    console.log('Straight:', new Straight().isStraight(table.getHandCards()));

    console.log('Flush:', new Flush().getRemaining(table.getHandCards()));
    console.log('Straight:', new Straight().getRemaining(table.getHandCards()));

    console.log('Pair:', new Pair().isPair(table.getHandCards()));
    console.log('Pair:', new Pair().getRemaining(table.getHandCards()));
    
    // Get remaining community cards that can still be dealt
    const remainingCommunityCards = table.getRemainingCommunityCards();
    console.log('Remaining community cards:', remainingCommunityCards);
    
    table.rank.flush = {
        isTrue: new Flush().isFlush(table.getHandCards()),
        remaining: new Flush().getRemaining(table.getHandCards(), remainingCommunityCards)
    }
    table.rank.straight = {
        isTrue: new Straight().isStraight(table.getHandCards()),
        remaining: new Straight().getRemaining(table.getHandCards(), remainingCommunityCards)
    }
    table.rank.pair = {
        isTrue: new Pair().isPair(table.getHandCards()),
        remaining: new Pair().getRemaining(table.getHandCards(), remainingCommunityCards)
    }
    table.rank.twoPair = {
        isTrue: new TwoPair().isTwoPair(table.getHandCards()),
        remaining: new TwoPair().getRemaining(table.getHandCards(), remainingCommunityCards)
    }
    table.rank.threeOfAKind = {
        isTrue: new ThreeOfAKind().isThreeOfAKind(table.getHandCards()),
        remaining: new ThreeOfAKind().getRemaining(table.getHandCards(), remainingCommunityCards)
    }

    table.rank.fullHouse = {
        isTrue: new FullHouse().isFullHouse(table.getHandCards()),
        remaining: new FullHouse().getRemaining(table.getHandCards(), remainingCommunityCards)
    }

    table.rank.fourOfAKind = {
        isTrue: new FourOfAKind().isFourOfAKind(table.getHandCards()),
        remaining: new FourOfAKind().getRemaining(table.getHandCards(), remainingCommunityCards)
    }

    table.rank.straightFlush = {
        isTrue: new StraightFlush().isStraightFlush(table.getHandCards()),
        remaining: new StraightFlush().getRemaining(table.getHandCards(), remainingCommunityCards)
    }

    table.rank.royalFlush = {
        isTrue: new RoyalFlush().isRoyalFlush(table.getHandCards()),
        remaining: new RoyalFlush().getRemaining(table.getHandCards(), remainingCommunityCards)
    }

    
    // Add ranking attribute as an object
    // table.ranking = {
    //     flush: new Flush(),
    //     straight: new Straight(),
    //     pair: new Pair(),
    //     two_pair: new TwoPair(),
    // }
    
    return table;
}
