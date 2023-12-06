import { Day } from "../lib/Day";

export class Day07 extends Day {
    testFilePart1(){ return 'test.txt'};
    testFilePart2(){ return 'test.txt'};
    part1Example(): string {
        return "???"
    }
    part2Example(): string {
        return "???"
    }

    part1(entries : string[]): string {
        let solution = "???"
        for (let i = 0; i < entries.length; i++) {
            console.log(`entry = ${entries[i]}`);
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