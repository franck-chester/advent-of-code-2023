import { Day } from "../lib/Day";

const symbolStrength = new Map<string, number>();
['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse().forEach((s, i) => symbolStrength.set(s, i));

interface Hand {
    symbols: string[];
    type: number;
    bid: number;
}

export function parseHand(entry: string): Hand {
    const parts = entry.split(' ');
    const symbols = parts[0].split('');
    return {
        symbols,
        type: calculateHand(symbols),
        bid: parseInt(parts[1])
    };
}
// return 0 for high card to 6 for 5 of a kind
export function calculateHand(symbols: string[]): number {
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

// If the result is negative, a is sorted before b, A is stronger than B
// If the result is positive, b is sorted before a, B is stronger than A
export function compareHands(a: Hand, b: Hand): number {
    // Hands are primarily ordered based on type; for example, every full house is stronger than any three of a kind.
    if (a.type != b.type) return b.type - a.type; // if b stronger than a, return positive number
    for (let s = 0; s < a.symbols.length; s++) {
        if(a.symbols[s] == b.symbols[s]) continue; // If the nth card in each hand have the same label, move on to considering the next card in each hand. 
        return symbolStrength.get(b.symbols[s])! - symbolStrength.get(a.symbols[s])!; // the hand with the stronger nth card is considered stronger (positive result)
    }
    return 0; // cards are identical
}

export function sortHandsInAscendingRankingOrder(hands: Hand[]) {
    hands.sort((a, b) => compareHands(b, a));
}
export class Day07 extends Day {
    testFilePart1() { return 'test.txt' };
    testFilePart2() { return 'test.txt' };
    part1Example(): string {
        return "6440"
    }
    part2Example(): string {
        return "???"
    }

    part1(entries: string[]): string {
        let solution = 0
        const hands = [] as Hand[];
        for (let i = 0; i < entries.length; i++) {
            console.log(`entry = ${entries[i]}`);
            const entry = entries[i].split(' ');
            const symbols = entry[0].split('');
            hands.push({
                symbols,
                type: calculateHand(symbols),
                bid: parseInt(entry[1])
            });
        }
        sortHandsInAscendingRankingOrder(hands);
        hands.forEach((h, i) => solution += (i+1) * h.bid);
        return `${solution}`;
    };

    part2(entries: string[]): string {
        let solution = "???"
        for (let i = 0; i < entries.length; i++) {
            console.log(`entry = ${entries[i]}`);
        }
        return `${solution}`;
    };

    // boiler plate

    basePath(): string {
        return __dirname;
    };

}


