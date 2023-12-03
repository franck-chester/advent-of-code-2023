import { Day } from "../lib/Day";

export class Day03 extends Day {
    testFilePart1() { return 'test.txt' };
    testFilePart2() { return 'test.txt' };
    part1Example(): string {
        return "4361"
    }

    isSymbolObject(X: number, Y: number, entries: string[]): boolean {
        return !(/\d|[\.]/).test(entries[Y].charAt(X));
    }

    isDigit(X: number, Y: number, entries: string[]): boolean {
        return (/\d/).test(entries[Y].charAt(X));
    }

    isAdjacentToSymbol(X: number, Y: number, entries: string[]): boolean {
        let result = false;
        let maxX = entries.length - 1;
        let maxY = entries[0].length - 1;
        for (let x = X - 1; x <= X + 1; x++) {
            if (x < 0 || x > maxX) continue;
            for (let y = Y - 1; y <= Y + 1; y++) {
                if (y < 0 || y > maxY) continue;
                if (x == X && y == Y) continue;

                result = result || this.isSymbolObject(x, y, entries);
                if (result) {
                    break;
                }
            }

        }

        return result;
    }
    part1(entries: string[]): string {
        let solution = 0;
        let currentNumberString = '';
        let currentNumberStringIsAdjacentToSymbol = false;
        let validPreviousChar = true;
        for (let y = 0; y < entries.length; y++) {
            let entry = entries[y];
            for (let x = 0; x < entries[y].length; x++) {
                let digit = this.isDigit(x, y, entries);
                if (digit) {
                    // build number
                    currentNumberString += entry.charAt(x);
                    currentNumberStringIsAdjacentToSymbol = currentNumberStringIsAdjacentToSymbol || this.isAdjacentToSymbol(x, y, entries);
                    continue;
                }
                if (!digit) {
                    // end of number
                    if (currentNumberStringIsAdjacentToSymbol) {
                        console.log(`adding ${currentNumberString} to solution`);
                        solution += parseInt(currentNumberString);

                    } else {
                        console.log(`dropping ${currentNumberString}`);


                    }
                    currentNumberString = '';
                    currentNumberStringIsAdjacentToSymbol = false;
                    continue;
                }
            }

        }
        return `${solution}`;
    };

    part2Example(): string {
        return "???"
    }
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


