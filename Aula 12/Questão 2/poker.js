const play = document.querySelector("#play-button");
const draw = document.querySelector("#draw-button");
const handContainer = document.querySelector("#hand-container");
const result = document.querySelector("#result");

let cards, hand;
createDeck();

function createDeck() {
    let h = 1, s = 1, c = 1, d = 1;
    cards = [];
    for (let i = 0; i < 52; i++) {
        cards.push(new Object());
        if (52/(i+1) >= 4) {
            cards[i].suitID = 'H';
            cards[i].suit = 'Hearts';
            cards[i].number = h;
            h++;
        };
        if (52/(i+1) < 4 && 52/(i+1) >= 2) {
            cards[i].suitID = 'S';
            cards[i].suit = 'Swords';
            cards[i].number = s;
            s++;
        };
        if (52/(i+1) < 2 && 52/(i+1) > 1.3) {
            cards[i].suitID = 'C';
            cards[i].suit = 'Clubs';
            cards[i].number = c;
            c++;
        };
        if (52/(i+1) <= 1.3) {
            cards[i].suitID = 'D';
            cards[i].suit = 'Diamonds';
            cards[i].number = d;
            d++;
        };
        cards[i].image = `${cards[i].number}-${cards[i].suitID}.png`;
    };
};

function shuffleDeck() {
    cards.sort(() => {return Math.random() - 0.5});
};

function verifyHand() {
    if (royalFlush()) {return 'Royal Flush!'};
    if (straightFlush()) {return 'Straight Flush!'};
    if (fourOfAKind()) {return 'Four of a kind!'};
    if (fullHouse()) {return 'Full House!'};
    if (flush()) {return 'Flush!'};
    if (straight()) {return 'Straight!'}; 
    if (threeOfAKind()) {return 'Three of a kind!'};
    if (twoPairs()) {return 'Two pairs!'};
    if (pair()) {return 'Pair!'};
    return `Highest card: ${highestCard()}`;
};

function highestCard() {
    if (hand[0].number === 1) {
        return 'Ace';
    } else {
        switch (hand[4].number) {
            case 11: return 'Jack';
            case 12: return 'Queen';
            case 13: return 'King';
        }
        return hand[4].number;
    };
};

function pair() {
    for (let i = 0; i < hand.length; i++) {
        for (let j = 0; j < hand.length; j++) {
            if(hand[i].number === hand[j].number && i !== j) {
                return true;
            };
        };
    };
    return false;
};

function twoPairs() {
    let flag = 0;
    for (let i = 0; i < hand.length; i++) {
        for (let j = 0; j < hand.length; j++) {
            if(hand[i].number === hand[j].number && i !== j) {
                flag++;
                j = hand.length;
                if (flag === 4) {
                    return true;
                };
            };
        };
    };
    return false;
};

function threeOfAKind() {
    for (let i = 0; i < hand.length; i++) {
        let count = 0;
        for (let j = 0; j < hand.length; j++) {
            if(hand[i].number === hand[j].number && i !== j) {
                count++;
                if (count === 2) {
                    return true;
                };
            };
        };
    };
    return false;
};

function straight() {
    let count = 0;
    
    if (isRoyal()) {
        return true;
    };
    
    for (let i = 1; i < hand.length; i++) {  
        if (hand[i].number - hand[i-1].number === 1) {
            count++;
        }
        if (count === 4) {
            return true;
        }
    };
    return false;
};

function isRoyal() {
    if (hand[0].number === 1 && hand[1].number === 10 && hand[2].number === 11 && hand[3].number === 12 && hand[4].number === 13) {
        return true;
    };
    return false;
};

function flush() {
    let count = 0;
    for (i = 1; i < hand.length; i++) {
        if (hand[i-1].suit === hand[i].suit) {
            count++;
        };
        if (count === 4) {
            return true;
        };
    };
    return false;
};

function fullHouse() {
    if (threeOfAKind() && twoPairs()) {
        return true;
    };
    return false;
};

function fourOfAKind() {
    for (let i = 0; i < hand.length; i++) {
        let count = 0;
        for (let j = 0; j < hand.length; j++) {
            if(hand[i].number === hand[j].number && i !== j) {
                count++;
                if (count === 3) {
                    return true;
                };
            };
        };
    };
    return false;
};

function straightFlush() {
    if (straight() && flush()) {
        return true;
    };
    return false;
};

function royalFlush() {
    if (isRoyal() && flush()) {
        return true;
    };
    return false;
};

function drawCards() {
    handContainer.innerHTML = '';
    result.innerHTML = '';
    hand.forEach((element) => {
        handContainer.innerHTML += `<img src="./cards/BACK.png" alt="card">`
    });
};

function showHand() {
    handContainer.innerHTML = '';
    result.textContent = verifyHand();
    hand.forEach((element) => {
        handContainer.innerHTML += `<img src="./cards/${element.image}" alt="card">`
    });
}

play.addEventListener('click', () => {
    showHand();
});

/* hand = [
    {suitID: 'S', suit: 'Swords', number: 10},
    {suitID: 'S', suit: 'Swords', number: 11},
    {suitID: 'S', suit: 'Swords', number: 12},
    {suitID: 'S', suit: 'Swords', number: 13},
    {suitID: 'S', suit: 'Swords', number: 9}
]; */

draw.addEventListener('click', () => {
    shuffleDeck();
    hand = cards.slice(0, 5).sort((a,b) => a.number - b.number);
    drawCards();
    console.log(hand);
    console.log(verifyHand());
});

function simulation(pulls) {
    const counter = {
        royalFlush: 0,
        straightFlush: 0,
        fourOfAKind: 0,
        fullHouse: 0,
        flush: 0,
        straight: 0,
        threeOfAKind: 0,
        twoPairs: 0,
        pair: 0
    };
    for (let i = 0; i < pulls; i++) {
        shuffleDeck();
        hand = cards.slice(0, 5).sort((a,b) =>{return a.number - b.number});
        //Poderia fazer com switch case mas fiquei com preguiça!
        if (verifyHand() === 'Royal Flush!') {counter.royalFlush++};
        if (verifyHand() === 'Straight Flush!') {counter.straightFlush++};
        if (verifyHand() === 'Four of a kind!') {counter.fourOfAKind++};
        if (verifyHand() === 'Full House!') {counter.fullHouse++};
        if (verifyHand() === 'Flush!') {counter.flush++};
        if (verifyHand() === 'Straight!') {counter.straight++};
        if (verifyHand() === 'Three of a kind!') {counter.threeOfAKind++};
        if (verifyHand() === 'Two pairs!') {counter.twoPairs++};
        if (verifyHand() === 'Pair!') {counter.pair++};
    };
    console.log(`For ${pulls} pulls:`)
    for(entry in counter) {
        console.log(`${entry}: ${counter[entry]}`);
    };
};