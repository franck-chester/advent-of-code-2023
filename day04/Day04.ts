import { Day } from "../lib/Day";

export class Day04 extends Day {
    testFilePart1(){ return 'test.txt'};
    testFilePart2(){ return 'test.txt'};
    part1Example(): string {
        return "13"
    }
    part2Example(): string {
        return "???"
    }

    part1(entries : string[]): string {
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

    part2(entries : string[]): string {
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

export function findWinningNumbers(numbers: string[], winningNumbers: Set<string>) {
    const myWinningNumbers = numbers.filter((n) => winningNumbers.has(n));
    const W = myWinningNumbers.length;
    return W;
}

export function parseCard(entry: string) {
    let matches = entry.match(/Card\s+(?<card>\d+): (?<winningNumbers>.*) \| (?<numbers>.*)/);
    if (!matches || !matches.groups) throw `Cant parse ${entry}`;
    const card = matches.groups.card;
    const winningNumbers = new Set(matches.groups.winningNumbers.split(/\s+/));
    const numbers = matches.groups.numbers.split(/\s+/);
    return { numbers, winningNumbers };
}

export function doubleNTimes(W: number) {
    return (W > 1) ? 2 ** (W - 1) : (W > 0) ? 1 : 0;
}
