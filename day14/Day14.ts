///////////////////
// BOILER PLATE  //

import { Grid } from "../lib/Grid";

///////////////////
const day = "Day14";
export function part1(entries: string[]): string { return part1Implementation(entries); };
part1.day = day;
part1.testFile = 'test.txt';
part1.example = '136';
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
    let solution = 0
    const platform = Grid.fromEntries(entries, (c) => c);
    for (let x = 0; x <= platform.maxX; x++) {
        const col = tiltLeft(platform.getCol(x));
        solution += weight(col);
    }
    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    let solution = '???'
    return `${solution}`;
}

export function tiltLeft(rowOrColumn: (string | undefined)[]) {
    let tiltedGroups = rowOrColumn.join('').split(/#+/).map((thingsBetweenRocks, i) => thingsBetweenRocks.replaceAll('.', '').padEnd(thingsBetweenRocks.length, '.'));
    let newRowOrColumn = [] as string[];
    let groupOfRocks = false;
    let t=0
    for (let i = 0; i < rowOrColumn.length; i++) {
        if (rowOrColumn[i] === '#') {
            if (!groupOfRocks) groupOfRocks = true;
            newRowOrColumn.push('#');
            continue;
        };
        groupOfRocks = false;
        newRowOrColumn.push(...(tiltedGroups[t].split('')));
        i+= tiltedGroups[t].length-1;
        t++;
    }
    console.log(`TILT ${rowOrColumn.join('')} => ${newRowOrColumn.join('')}`)
    return newRowOrColumn;
}

export function weight(column : string[]) {
    let weight = 0;
    let maxWeight = column.length;
    column.forEach((c,w) => weight+= (c === 'O') ? (maxWeight -w) : 0);

    console.log(` ${weight} weight for ${column.join('')} `)
    return weight;
}

