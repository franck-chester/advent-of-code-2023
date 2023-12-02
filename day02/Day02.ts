import { Day } from "../lib/Day";

export class Day02 extends Day {

    testFilePart1() { return 'test.txt' };
    testFilePart2() { return 'test.txt' };

    parseGameAndSets(entry: string): {
        game: number, setsString: string, setsList: string[],
        sets: { red: number, blue: number, green: number }[],
        minimums: { red: number, blue: number, green: number },
        tests: { red: boolean; blue: boolean; green: boolean; }[]
    } {
        let matches = entry.match(/Game (?<game>\d+): (?<sets>.*)/);
        if (!matches || !matches.groups) throw ("can't parse entry");
        const setsString = matches!.groups.sets;
        const setsList = setsString.split('; ');
        const sets = this.parseSetList(setsList);
        const minimums = this.calculateMinimums(sets);
        const tests = this.testSetsArePossible(sets);
        return {
            game: parseInt(matches.groups.game),
            setsString,
            setsList,
            sets,
            minimums,
            tests
        }
    }
    calculateMinimums(sets: { red: number; blue: number; green: number; }[]) {
        return sets.reduce((previous, current, array) => {
            return {
                red: current.red > previous.red ? current.red : previous.red,
                blue:  current.blue > previous.blue ? current.blue : previous.blue,
                green:  current.green > previous.green ? current.green : previous.green,
            }
        });
    }
    testSetsArePossible(sets: { red: number; blue: number; green: number; }[]): { red: boolean; blue: boolean; green: boolean; }[] {
        return sets.map((set) => {
            return {
                red: set.red <= 12,
                green: set.green <= 13,
                blue: set.blue <= 14,
            }
        });
    }
    testAllSetsArePossible(sets: { red: boolean; blue: boolean; green: boolean; }[]): { red: boolean; blue: boolean; green: boolean; }{
        return sets.reduce((previous, current, index, array)=> {
            return {
                red:(previous.red && current.red), 
                blue : (previous.blue && current.blue), 
                green:(previous.green && current.green)
            }
        });
    }
    parseSetList(setsList: string[]): { red: number, blue: number, green: number }[] {
        return setsList.map((set, i, setsList) => {
            let result = { red: 0, blue: 0, green: 0 };
            let s = set.split(', ');
            s.forEach(s => {
                let matches = s.match(/(?<count>\d+) (?<colour>.*)/);
                if (!matches || !matches.groups) throw ("can't parse set");
                let count = parseInt(matches.groups.count)
                switch (matches.groups.colour) {
                    case 'red': result.red = count; break;
                    case 'blue': result.blue = count; break;
                    case 'green': result.green = count; break;
                }
            })
            return result;
        });
    }

    parse1(entry: string): { game: number, sets: { blue: number, red: number, green: number }[] } {
        let gameAndSets = this.parseGameAndSets(entry);
        return { game: gameAndSets.game, sets: gameAndSets.sets };
    }

    part1Example(): string {
        return "8"
    }

    part1(entries: string[]): string {
        let solution = 0;
        for (let i = 0; i < entries.length; i++) {
            let gameAndSets = this.parseGameAndSets(entries[i]);
            let test = this.testAllSetsArePossible(gameAndSets.tests);
            if (test.blue && test.green && test.red) {
                solution += gameAndSets.game;
                console.log(` - Game ${gameAndSets.game} : ${JSON.stringify(gameAndSets.tests)}`)
            } else {
                console.log(` X Game ${gameAndSets.game} : ${JSON.stringify(gameAndSets.tests)}`)
            }

        }
        return `${solution}`;
    };


    parse2(entry: string): any {
        console.log(`Parse 1 : ${entry} ...`);

        return {};
    }


    part2Example(): string {
        return "2286"
    }

    part2(entries: string[]): string {
        let solution = 0;
        for (let i = 0; i < entries.length; i++) {
            let gameAndSets = this.parseGameAndSets(entries[i]);
            let power = this.calculatePower(gameAndSets.minimums); 
            solution += power
        }
        return `${solution}`;
    };

    calculatePower(sums: { red: number; blue: number; green: number; }) {
        return sums.red * sums.green * sums.blue;
    }

    // boiler plate

    basePath(): string {
        return __dirname;
    };

}