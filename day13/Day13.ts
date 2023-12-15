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
part2.testFile = ['test01.txt', 'test02.txt', 'test03.txt', 'test04.txt'];
part2.example = ['300', '100', '400'];
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
                console.log(`YES !! Found vertical line of symmetry at X = ${X}, adding  ${X}+1 = ${X + 1}`)
                solution += X + 1;
                grid.insertEmptyColumnAt(X + 1, '|');
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
                console.log(`YES !! Found horizontal line of symmetry at Y = ${Y}, adding  100 * (${Y}+1) = ${100 * (Y + 1)}`)
                solution += 100 * (Y + 1);
                grid.insertRowAt(Y + 1, '-');
            }
        }
        console.log(`NOTES ${noteCount} with vertical && horizontal symmetry line:`);
        grid.logToConsole(c => c!);

    });

    return `${solution}`
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


/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    let solution = 0;
    let notes = [] as string[];
    let noteCount = 0;

    // first pass as per part 1 to keep track of symmetry lines
    let existingLines = [] as string[];
    entries.forEach((entry, e) => {
        if (entry.length != 0) {
            notes.push(entry);

            if (e < entries.length - 1) return;
        }
        let grid = Grid.fromEntries(notes, (c) => c);
        notes = [];
        noteCount++;
        //console.log(`NOTES ${noteCount} :`);
        //grid.logToConsole(c => c!);

        // look at columns
        for (let X = 0; X < grid.maxX; X++) {
            let lineOfSymmetry = true;
            //console.log(`Is there a vertical line of symmetry at X = ${X} ??? `)
            for (let x = 0; X + x + 1 <= grid.maxX && X - x >= 0; x++) {
                //console.log(`... x= ${x} : compare columns at ${X - x} and ${X + x + 1}... `)
                if (!identicalRowsOrColums(grid.getCol(X - x), grid.getCol(X + x + 1))) {
                    lineOfSymmetry = false;
                    break;
                }
            }
            if (lineOfSymmetry) {
                //console.log(`YES !! Found vertical line of symmetry at X = ${X}, adding  ${X}+1 = ${X + 1}`)
                existingLines.push(`V${X}`)
                break;
            }
        }
        //console.log(`NOTES ${noteCount} with vertical symmetry line:`);
        //grid.logToConsole(c => c!);

        // look at rows
        for (let Y = 0; Y < grid.maxY; Y++) {
            let lineOfSymmetry = true;
            //console.log(`Is there a horizontal line of symmetry at Y = ${Y} ??? `)
            for (let y = 0; Y + y + 1 <= grid.maxY && Y - y >= 0; y++) {
                //console.log(`... y= ${y} : compare rows at ${Y - y} and ${Y + y + 1}... `)
                if (!identicalRowsOrColums(grid.getRow(Y - y), grid.getRow(Y + y + 1))) {
                    lineOfSymmetry = false;
                    break;
                }
            }
            if (lineOfSymmetry) {
                //console.log(`YES !! Found horizontal line of symmetry at Y = ${Y}, adding  100 * (${Y}+1) = ${100 * (Y + 1)}`)
                existingLines.push(`H${Y}`)
            }
        }
    });

    console.log(`Existing lines as per part 1: [${Array.from(existingLines.values())}]`)

    // Now part 2 proper
    notes = [] as string[];
    noteCount = 0;

    entries.forEach((entry, e) => {
        if (entry.length != 0) {
            notes.push(entry);

            if (e < entries.length - 1) return;
        }
        let grid = Grid.fromEntries(notes, (c) => c);
        notes = [];
        noteCount++;
        //console.log(`NOTES ${noteCount} :`);
        //grid.logToConsole(c => c!);

        // look at columns
        let potentialSmudgeIndex = -1;
        let potentialSmudges = [-1, -1];
        for (let X = 0; X < grid.maxX; X++) {
            potentialSmudgeIndex = -1;
            potentialSmudges = [-1, -1];
            if (existingLines[noteCount - 1] === `V${X}`) continue; // known line, don't re-process
            let lineOfSymmetry = true;
            console.log(`Is there a vertical line of symmetry at X = ${X} ??? `)
            for (let x = 0; X + x + 1 <= grid.maxX && X - x >= 0; x++) {
                //console.log(`... x= ${x} : compare columns at ${X - x} and ${X + x + 1}... `)
                let nearIdentical = nearIdenticalRowsOrColums(grid.getCol(X - x), grid.getCol(X + x + 1));
                console.log(`nearIdentical = ${JSON.stringify(nearIdentical)}`)
                if (!nearIdentical.identical) {
                    lineOfSymmetry = false;
                    break;
                }
                if (nearIdentical.potentialSmudgeIndex > -1) {
                    if (potentialSmudgeIndex > -1) { // we already know of one smudge, new one is one too many
                        lineOfSymmetry = false;
                        break;
                    }
                    console.log (`potentialSmudgeIndex = ${nearIdentical.potentialSmudgeIndex}, potentialSmudges = [${X - x}, ${X + x + 1}]`)
                    potentialSmudgeIndex = nearIdentical.potentialSmudgeIndex;
                    potentialSmudges = [X - x, X + x + 1]
                }
            }
            if (lineOfSymmetry) {
                console.log(`${noteCount} : Found NEW  (V${X} != ${existingLines[noteCount - 1]}) vertical line of symmetry at X = ${X}, with a smudge at ${potentialSmudgeIndex}, adding  ${X}+1 = ${X + 1}`)
                solution += X + 1;
                if (potentialSmudgeIndex > -1) {
                    grid.setCell(potentialSmudges[0], potentialSmudgeIndex, '*');
                    grid.setCell(potentialSmudges[1], potentialSmudgeIndex, '*');
                }
                break;
            }

        }

        //console.log(`NOTES ${noteCount} with vertical symmetry line:`);
        //grid.logToConsole(c => c!);

        // look at rows
        for (let Y = 0; Y < grid.maxY; Y++) {
            potentialSmudgeIndex = -1;
            potentialSmudges = [-1, -1];
            if (existingLines[noteCount - 1] === `H${Y}`)continue; // known line, don't re-process
            let lineOfSymmetry = true;
            potentialSmudgeIndex = -1;
            potentialSmudges = [-1, -1];
            console.log(`Is there a horizontal line of symmetry at Y = ${Y} ??? `)
            for (let y = 0; Y + y + 1 <= grid.maxY && Y - y >= 0; y++) {
                
                //console.log(`... y= ${y} : compare rows at ${Y - y} and ${Y + y + 1}... `)
                let nearIdentical = nearIdenticalRowsOrColums(grid.getRow(Y - y), grid.getRow(Y + y + 1));
                //console.log(` ... nearIdentical.identical == ${nearIdentical.identical} `)
                if (!nearIdentical.identical) {
                    //console.log(` ...... !nearIdentical.identical == ${!nearIdentical.identical} break`)
                    lineOfSymmetry = false;
                    break;
                }
                //console.log(` ... nearIdentical.potentialSmudgeIndex > -1 == ${nearIdentical.potentialSmudgeIndex} > -1 = ${nearIdentical.potentialSmudgeIndex > -1} ...`)
                if (nearIdentical.potentialSmudgeIndex > -1) {

                    if (potentialSmudgeIndex > -1) { // we already know of one smudge, new one is one too many
                        lineOfSymmetry = false;
                        break;
                    }
                    //console.log(` ...... storing potential smudge @ ${nearIdentical.potentialSmudgeIndex}`)
                    potentialSmudgeIndex = nearIdentical.potentialSmudgeIndex;
                    potentialSmudges = [Y - y, Y + y + 1]
                }
            }
            if (lineOfSymmetry) {
                console.log(`${noteCount} : Found NEW (H${Y} != ${existingLines[noteCount - 1]}) horizontal line of symmetry at Y = ${Y}, with a smudge at ${potentialSmudgeIndex}, adding  100 * (${Y}+1) = ${100 * (Y + 1)}`)
                solution += 100 * (Y + 1);
                if (potentialSmudgeIndex > -1) {
                    grid.setCell(potentialSmudgeIndex, potentialSmudges[0], '*');
                    grid.setCell(potentialSmudgeIndex, potentialSmudges[1], '*');
                }
            }
        }
        //console.log(`NOTES ${noteCount} with vertical && horizontal symmetry line, ignoring ${existingLines[noteCount-1]}:`);
        //grid.logToConsole(c => c!);

    });

    console.log(`Existing lines as per part 1: [${Array.from(existingLines.values())}]  all ${existingLines.length} of them`)

    return `${solution}`
}


function nearIdenticalRowsOrColums(a: (string | undefined)[], b: (string | undefined)[]) {
    let identical = true;
    if (a.length != b.length) throw `Can only compare rows or columns of identical length : ${a.length} != ${b.length}`
    //console.log(`nearIdenticalRowsOrColums :\n a = ${a.join('')}\n b = ${b.join('')}`)
    let potentialSmudges = 0;
    let potentialSmudgeIndex = -1;
    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
            potentialSmudges++;
            potentialSmudgeIndex = i;
            if (potentialSmudges > 1) break;
        }
    }
    if (potentialSmudges > 1) {
        //console.log(`  too many (${potentialSmudges}) potentialSmudges `);
        identical = false;
    }
    if (identical) {
        console.log(`nearIdenticalRowsOrColums :\n a = ${a.join('')}\n b = ${b.join('')} are ${potentialSmudges > 0 ? 'nearly' : 'exactly'} identical`);
        if (potentialSmudges > 0) console.log(` potentialSmudges = ${potentialSmudges} @ ${potentialSmudgeIndex}`);
    }
    else console.log(`nearIdenticalRowsOrColums :\n a = ${a.join('')}\n b = ${b.join('')} are NOT identical (${potentialSmudges} potential smudges)`);
    return { identical, potentialSmudgeIndex };
}
