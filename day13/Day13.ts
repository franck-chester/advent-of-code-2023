///////////////////
// BOILER PLATE  //

import { Grid } from "../lib/Grid";

///////////////////
const day = "Day13";
export function part1(entries: string[]): string { return part1Implementation(entries); };
part1.day = day;
part1.testFile = ['test01.txt', 'test02.txt', 'test03.txt'];
part1.example = ['5', '400', '405'];
part1.inputFile = 'input.txt';

export function part2(entries: string[]): string { return part2Implementation(entries); };
part2.day = day;
part2.testFile = 'test.txt';
part2.example = '???';
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
function part1Implementation(entries: string[]) {
    let solution = 0;
    let notes = [] as string[];
    let noteCount = 0;
    entries.forEach((entry, e) => {
        if (entry.length != 0) {
            notes.push(entry);

            if (e < entries.length - 1) return;
        }
        let grid = Grid.fromEntries(notes, (c) => c);
        notes = [];
        noteCount++;
        console.log(`NOTES ${noteCount} :`);
        grid.logToConsole(c => c!);

        // look at columns
        for (let X = 0; X < grid.maxX; X++) {
            let lineOfSymmetry = true;
            console.log(`Is there a vertical line of symmetry at X = ${X} ??? `)
            for (let x = 0; X + x + 1 <= grid.maxX && X - x >= 0; x++) {
                //console.log(`... x= ${x} : compare columns at ${X - x} and ${X + x + 1}... `)
                if (!identicalRowsOrColums(grid.getCol(X - x), grid.getCol(X + x + 1))) {
                    lineOfSymmetry = false;
                    break;
                }
            }
            if (lineOfSymmetry) {
                console.log(`YES !! Found vertical line of symmetry at X = ${X}, adding  ${X}+1 = ${X+ 1}`)
                solution += X + 1;
                grid.insertColumnAt(X+1,'|');
                break;
            }
        }
        console.log(`NOTES ${noteCount} with vertical symmetry line:`);
        grid.logToConsole(c => c!);

        // look at rows
        for (let Y = 0; Y < grid.maxY; Y++) {
            let lineOfSymmetry = true;
            console.log(`Is there a horizontal line of symmetry at Y = ${Y} ??? `)
            for (let y = 0; Y + y + 1 <= grid.maxY && Y - y >= 0; y++) {
                //console.log(`... y= ${y} : compare rows at ${Y - y} and ${Y + y + 1}... `)
                if (!identicalRowsOrColums(grid.getRow(Y - y), grid.getRow(Y + y + 1))) {
                    lineOfSymmetry = false;
                    break;
                }
            }
            if (lineOfSymmetry) {
                console.log(`YES !! Found horizontal line of symmetry at Y = ${Y}, adding  100 * (${Y}+1) = ${100 * (Y+ 1)}`)
                solution += 100 * (Y+ 1);
                grid.insertRowAt(Y+1,'-');
            }
        }
        console.log(`NOTES ${noteCount} with vertical && horizontal symmetry line:`);
        grid.logToConsole(c => c!);

    });

    return `${solution}`
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    let solution = '???'
    return `${solution}`;
}

function identicalRowsOrColums(a: (string | undefined)[], b: (string | undefined)[]) {
    let identical = true;
    if (a.length != b.length) throw `Can only compare rows or columns of identical length : ${a.length} != ${b.length}`
    //console.log(`identicalRowsOrColums :\n a = ${a.join('')}\n b = ${b.join('')}`)
    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
            identical = false;
            break;
        }
    }
    if (identical) {
        console.log(`identicalRowsOrColums :\n a = ${a.join('')}\n b = ${b.join('')}`)
    }
    return identical;
}
