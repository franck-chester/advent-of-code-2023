import { Day } from "../lib/Day";

export class Day01 extends Day {
    testFilePart1(){ return 'example1.txt'};
    testFilePart2(){ return 'example2.txt'};

    parse1(entry: string): { f: number, l: number, r: number } {
        console.log(`Parse 1 : ${entry} ...`);
        let matches = entry.match(/^\D*(?<f>\d).*(?<l>\d)\D*$/);
        if (matches && matches.groups) return {
            f: parseInt(matches!.groups.f),
            l: parseInt(matches!.groups.l),
            r: parseInt(`${matches!.groups.f}${matches!.groups.l}`)
        };
        matches = entry.match(/^\D*(?<f>\d).*$/);
        if (matches && matches.groups)
            return {
                f: parseInt(matches!.groups.f),
                l: parseInt(matches!.groups.f),
                r: parseInt(`${matches!.groups.f}${matches!.groups.f}`)
            };
        console.log(`Parse 1 : $entry} ...`);
        return { f: 0, l: 0, r: 0 };
    }

    toNumber(v: string): number {
        var result = Number(v);
        if (!isNaN(result)) return result;
        return {
            'one': 1,
            'two': 2,
            'three': 3,
            'four': 4,
            'five': 5,
            'six': 6,
            'seven': 7,
            'eight': 8,
            'nine': 9
        }[v]!;
    }

    parse2(entry: string): { f: number, l: number, r: number } {
        let l = -1;
        const rg = /(\d|one|two|three|four|five|six|seven|eight|nine)/g;
        let f = this.toNumber(rg.exec(entry)![0]);
        const L = entry.length;

        // because of blended numbers like twone, have to match backward
        for (var i = L; i >= 0; i--) {
            let m = rg.exec(entry.substring(i, L));
            if (m) {
                l = this.toNumber(m[0]);
                break;
            }
        }

        console.log(`Parse 2 : ${entry} : ${f} ${l}...`);
        return {
            f,
            l,
            r: parseInt(`${f}${l}`)
        };

    }

    part1Example(): string {
        return "142"
    }
    part2Example(): string {
        return "281"
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