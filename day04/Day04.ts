import { Day } from "../lib/Day";

export class Day04 extends Day {
    testFilePart1() { return 'test.txt' };
    testFilePart2() { return 'test.txt' };
    part1Example(): string {
        return "13"
    }
    part2Example(): string {
        return "30"
    }

    part1(entries: string[]): string {
        let solution = 0
        for (let i = 0; i < entries.length; i++) {
            console.log(`entry = ${entries[i]}`);
            let entry = entries[i];
            const { numbers, winningNumbers } = parseCard(entry);
            const W = findWinningNumbers(numbers, winningNumbers);
            solution += doubleNTimes(W);
        }
        return `${solution}`;
    };

    part2(entries: string[]): string {
        let solution = 0
        const cards = [] as Card[];
        const cardCounter = new Map<string, number>();
        for (let i = 0; i < entries.length; i++) {
            console.log(`entry = ${entries[i]}`);
            let card = parseCard(entries[i]);
            cards.push(card);
            cardCounter.set(card.cardId,1);
        }

        for (let i = 0; i < entries.length; i++) {
            const card = cards[i];
            // is it a winner?
            const w = findWinningNumbers(card.numbers, card.winningNumbers);
            // how many have we got?
            const cardCount = cardCounter.has(card.cardId) ? cardCounter.get(card.cardId)! : 0;
            if (w > 0) {
                console.log(`Each of ${cardCount} Card ${card.cardId} has ${w} winning numbers`)

                for (let j = 0; j < w; j++) {
                    const nextCardId = i + j + 1;

                    console.log(`   -> ${cardCount} cop${cardCount > 1 ? 'ies' : 'y'} of Card ${cards[nextCardId].cardId}`)
                    incrementCardCount(nextCardId, cardCount);
                }
            }
        }

        console.log(`Card count : ${JSON.stringify(Object.fromEntries(cardCounter))}`)
        cardCounter.forEach((count) => solution += count);


        return `${solution}`;

        function incrementCardCount(cardIndex: number, count:number) {
            const card = cards[cardIndex];
            if (!cardCounter.has(card.cardId)) cardCounter.set(card.cardId, count);
            cardCounter.set(card.cardId, cardCounter.get(card.cardId)! + count);

        }
    };

    // boiler plate

    basePath(): string {
        return __dirname;
    };

}

export function findWinningNumbers(numbers: string[], winningNumbers: Set<string>) {
    const myWinningNumbers = numbers.filter((n) => winningNumbers.has(n));
    const W = myWinningNumbers.length;
    return W;
}
interface Card { cardId: string, numbers: string[], winningNumbers: Set<string> }
export function parseCard(entry: string): Card {
    let matches = entry.match(/Card\s+(?<card>\d+): (?<winningNumbers>.*) \| (?<numbers>.*)/);
    if (!matches || !matches.groups) throw `Cant parse ${entry}`;
    const card = matches.groups.card;
    const winningNumbers = new Set(matches.groups.winningNumbers.split(/\s+/));
    const numbers = matches.groups.numbers.split(/\s+/);
    return { cardId: card, numbers, winningNumbers };
}

export function doubleNTimes(W: number) {
    return (W > 1) ? 2 ** (W - 1) : (W > 0) ? 1 : 0;
}
