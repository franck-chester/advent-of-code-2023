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
        return "467835"
    }

    isGear(X: number, Y: number, entries: string[]): boolean {
        return (/\*/).test(entries[Y].charAt(X));
    }

    isAdjacentToGearSymbol(X: number, Y: number, entries: string[]): {adjacent:boolean, gears: {x:number, y:number}[]} {
        let result = {adjacent:false, gears: [] as {x:number, y:number}[]};

        let maxX = entries.length - 1;
        let maxY = entries[0].length - 1;
        for (let x = X - 1; x <= X + 1; x++) {
            if (x < 0 || x > maxX) continue;
            for (let y = Y - 1; y <= Y + 1; y++) {
                if (y < 0 || y > maxY) continue;
                if (x == X && y == Y) continue;

                if(this.isGear(x, y, entries))
                {
                    result.adjacent = true;
                    result.gears.push({x,y})
                }
            }

        }

        return result;
    }

    part2(entries: string[]): string {
        let solution = 0;
        let currentNumberString = '';
        let currentNumberStringIsAdjacentToGearSymbol = false;
        let currentNumberGears = [] as string[];
        let gearsMap = new Map<string, number[]>()
        for (let y = 0; y < entries.length; y++) {
            let entry = entries[y];
            for (let x = 0; x < entries[y].length; x++) {
                let digit = this.isDigit(x, y, entries);
                if (digit) {
                    // build number
                    currentNumberString += entry.charAt(x);
                    let gearInfo = this.isAdjacentToGearSymbol(x, y, entries);
                    if(gearInfo.adjacent){
                        currentNumberStringIsAdjacentToGearSymbol = true;
                        currentNumberGears.push(...gearInfo.gears.map((coordinates) => `${coordinates.x},${coordinates.y}` ))
                    }

                    continue;
                }
                if (!digit) {
                    // end of number
                    if (currentNumberStringIsAdjacentToGearSymbol) {
                        // add number to gears map
                        console.log(`adding ${currentNumberString} to gear map`);
                        const currentNumber = parseInt(currentNumberString)
                        currentNumberGears.forEach((gear) => {
                            if(!gearsMap.has(gear)){
                                gearsMap.set(gear,[]);
                            }
                            gearsMap.get(gear)?.push(currentNumber);
                        })
                        
                        
                    } else {
                        console.log(`dropping ${currentNumberString}`);
                    }
                    currentNumberString = '';
                    currentNumberStringIsAdjacentToGearSymbol = false;
                    currentNumberGears = [];
                    continue;
                }
            }

        }
        // Now go through gear map to find valid gear
        gearsMap.forEach((serialNumbers, gear)=>{
            const uniqueSerialNumbers = [...new Set(serialNumbers)];
            console.log(`Gear @ ${gear} : ${JSON.stringify(uniqueSerialNumbers)} from ${JSON.stringify(serialNumbers)}...`)
            if(uniqueSerialNumbers.length == 2){
                const ratio = uniqueSerialNumbers[0] * uniqueSerialNumbers[1];
                console.log(`Gear @ ${gear} adjacents to ${uniqueSerialNumbers[0]} and ${uniqueSerialNumbers[1]} - ratio = ${ratio}`)
                solution += ratio;
            }
        });
        return `${solution}`;
    };

    // boiler plate

    basePath(): string {
        return __dirname;
    };

}


