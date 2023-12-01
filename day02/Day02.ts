import { Day } from "../lib/Day";

export class Day02 extends Day {
    testFilePart1(){ return 'test.txt'};
    testFilePart2(){ return 'test.txt'};

    parse1(entry: string): any {
        console.log(`Parse 1 : ${entry} ...`);
        
        return {};
    }

    parse2(entry: string): any {
        console.log(`Parse 1 : ${entry} ...`);
        
        return {};
    }

    part1Example(): string {
        return "???"
    }
    part2Example(): string {
        return "??"
    }

    part1(entries: string[]): string {
        let solution = 0;
        for (let i = 0; i < entries.length; i++) {
            solution += this.parse1(entries[i]).r;
        }
        return `${solution}`;
    };


    part2(entries: string[]): string {
        let solution = 0;
        for (let i = 0; i < entries.length; i++) {
            solution += this.parse2(entries[i]).r;
        }
        return `${solution}`;
    };

    // boiler plate

    basePath(): string {
        return __dirname;
    };

}