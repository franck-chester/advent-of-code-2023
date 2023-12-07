import { Day } from "../lib/Day";

const symbolsListPart1 = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
export const symbolStrengthPart1 = new Map<string, number>();
symbolsListPart1.reverse().forEach((s, i) => symbolStrengthPart1.set(s, i));

const symbolsListPart2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
export const symbolStrengthPart2 = new Map<string, number>();
symbolsListPart2.reverse().forEach((s, i) => symbolStrengthPart2.set(s, i));

interface Hand {
    symbols: string[];
    type: number;
    bid: number;
}

export function parseHand(entry: string, calculateHand: (symbols: string[]) => number): Hand {
    const parts = entry.split(' ');
    const symbols = parts[0].split('');
    return {
        symbols,
        type: calculateHand(symbols),
        bid: parseInt(parts[1])
    };
}
// return 0 for high card to 6 for 5 of a kind
export function calculateHandWithoutJokers(symbols: string[]): number {
    const counts = [] as number[];
    const symbolsSet = new Set(symbols);
    symbolsSet.forEach(s1 => counts.push(symbols.filter((s2) => s2 == s1).length));
    counts.sort((a, b) => b - a); // counts in descending order
    switch (symbolsSet.size) {
        case 1: return 6;
        case 2: return counts[0] == 4 ? 5 : 4;
        case 3: return counts[0] == 3 ? 3 : 2;
        case 4: return 1;
        default: return 0;
    }
}

// return 0 for high card to 6 for 5 of a kind
export function calculateHandWithJokers(symbols: string[]): number {
    const symbolsCount = new Map<string, { symbol: string, count: number }>();

    symbols.forEach(symbol => {
        symbolsCount.set(symbol, symbolsCount.has(symbol) ? { symbol, count: symbolsCount.get(symbol)!.count + 1 } : { symbol, count: 1 });
    });

    // By Decreasing Count Then Strength (unless a joker)
    let symbolsRanked = Array.from(symbolsCount.entries()).sort((a, b) => {
        let symbolA = symbolsCount.get(a[1].symbol)!;
        let symbolB = symbolsCount.get(b[1].symbol)!;
        if (symbolA.symbol == 'J') return 1; // everything higher than J regardless of count
        if (symbolB.symbol == 'J') return -1;  // everything higher than J regardless of count
        if (symbolA.count == symbolB.count) return symbolStrengthPart2.get(symbolB.symbol)! - symbolStrengthPart2.get(symbolA.symbol)!;
        return symbolB.count - symbolA.count;
    });

    let jokers = symbolsCount.has('J') ? symbolsCount.get('J')!.count : 0;

    // remove the joker entries and distribute the jokers
    symbolsRanked = symbolsRanked.filter(s=> s[0]  != 'J');
    symbolsRanked.forEach(s => {
        while (s[1].count < 5 && jokers > 0){
             s[1].count++;
             jokers--;
        }
    });
    if (jokers == 5) return 6; // 5 remaining jokers can be turned into 5 of a kind 

    switch (symbolsRanked.length) {
        case 1: return 6;                                               // 5 of a kind (5 identical symbols (inc jokers))
        case 2: {                               // 2 sets of symbols
            switch (symbolsRanked[0][1].count) {
                case 4: return 5;                                       // 4 of a kind (4+ 1)
                default: return 4;                                      // full house (3+2)
            }
        }
        case 3: {                              // 3 sets of symbols
            switch (symbolsRanked[0][1].count) {
                case 3: return 3;                                       // 3 of a kind (3+1+1)
                default: return 2 ;                                     // 2 pairs (2+2+1)
            }
        }
        case 4: return  1;                                              // 1 pair (2+1+1+1)
        default: return 0;                                              // high hand
    }
}

// If the result is negative, a is sorted before b, A is stronger than B
// If the result is positive, b is sorted before a, B is stronger than A
export function compareHands(a: Hand, b: Hand, symbolStrength: Map<string, number>): number {
    // Hands are primarily ordered based on type; for example, every full house is stronger than any three of a kind.
    if (a.type != b.type) return b.type - a.type; // if b stronger than a, return positive number
    for (let s = 0; s < a.symbols.length; s++) {
        if (a.symbols[s] == b.symbols[s]) continue; // If the nth card in each hand have the same label, move on to considering the next card in each hand. 
        return symbolStrength.get(b.symbols[s])! - symbolStrength.get(a.symbols[s])!; // the hand with the stronger nth card is considered stronger (positive result)
    }
    return 0; // cards are identical
}

export function sortHandsInAscendingRankingOrder(hands: Hand[], symbolStrength: Map<string, number>) {
    hands.sort((a, b) => compareHands(b, a, symbolStrength));
}
export class Day07 extends Day {
    testFilePart1() { return 'test.txt' };
    testFilePart2() { return 'test.txt' };
    part1Example(): string {
        return "6440"
    }
    part2Example(): string {
        return "5905"
    }

    part1(entries: string[]): string {
        let solution = 0
        const hands = [] as Hand[];
        for (let i = 0; i < entries.length; i++) {
            console.log(`entry = ${entries[i]}`);
            const entry = entries[i].split(' ');
            const symbols = entry[0].split('');
            hands.push(parseHand(entries[i], calculateHandWithoutJokers));
        }
        sortHandsInAscendingRankingOrder(hands, symbolStrengthPart1);
        hands.forEach((h, i) => solution += (i + 1) * h.bid);
        return `${solution}`;
    };

    part2(entries: string[]): string {
        let solution = 0
        const hands = [] as Hand[];
        for (let i = 0; i < entries.length; i++) {
            console.log(`entry = ${entries[i]}`);
            const entry = entries[i].split(' ');
            const symbols = entry[0].split('');
            hands.push(parseHand(entries[i], calculateHandWithJokers));
        }
        sortHandsInAscendingRankingOrder(hands, symbolStrengthPart2);
        hands.forEach((h, i) => solution += (i + 1) * h.bid);
        return `${solution}`;
    };

    // boiler plate

    basePath(): string {
        return __dirname;
    };

}


