///////////////////
// BOILER PLATE  //

import { Grid } from "../lib/Grid";

///////////////////
const day = "Day11";
export function part1(entries: string[]): string { return part1Implementation(entries); };
part1.day = day;
part1.testFile = 'test.txt';
part1.example = '374';
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
    const universe = Grid.fromEntries<string>(entries, (s) => s);

    universe.logToConsole(c => c!);

    // expansion
    let emptyCols = [] as number[];
    let emptyRows = [] as number[];
    for (let x = universe.maxX; x >= 0; x--) {
        if (!universe.getCol(x).includes('#')) emptyCols.push(x);
    }
    for (let y = universe.maxY; y >= 0; y--) {
        if (!universe.getRow(y).includes('#')) emptyRows.push(y);
    }
    console.log(`empty rows : ${emptyRows}, empty cols : ${emptyCols}, galaxy after expansion =`);

    emptyCols.forEach(x => universe.insertEmptyColumnAt(x, '.'));
    emptyRows.forEach(y => universe.insertRowAt(y, '.'));
    universe.logToConsole(c => c!);

    // get the galaxy coordinates
    const galaxies = [] as { x: number, y: number }[]
    for (let x = 0; x <= universe.maxX; x++) {
        for (let y = 0; y <= universe.maxY; y++) {
            if (universe.cells[x][y] == '#') galaxies.push({ x, y });
        }
    }

    console.log(`Pairing...`);
    const galaxyPairs = [] as { g1: { x: number, y: number }, g2: { x: number, y: number } }[];
    const galaxyPairNames = new Set<string>();
    galaxies.forEach(g1 => galaxies.forEach(g2 => {
        if ((g2 != g1) && !(galaxyPairNames.has(`(${g2.x},${g2.y})(${g1.x},${g1.y})`))) {
            galaxyPairs.push({ g1, g2 });
            galaxyPairNames.add(`(${g1.x},${g1.y})(${g2.x},${g2.y})`);
        }
    }));

    console.log(`Found ${galaxyPairs.length} pairs of galaxies:`);
    const galaxyPairMinimumDistances = galaxyPairs.map(p => Math.abs(p.g2.x - p.g1.x) + Math.abs(p.g2.y - p.g1.y));

    //console.log(`Distances : ${galaxyPairMinimumDistances}`);
    let solution = galaxyPairMinimumDistances.reduce((a, b) => a + b);
    console.log(`${galaxyPairs.length} pairs add to ${solution}`)
    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    const universe = Grid.fromEntries<string>(entries, (s) => s);

    universe.logToConsole(c => c!);

    // locate expansion zones
    let emptyCols = [] as number[];
    let emptyRows = [] as number[];
    for (let x = 0; x<=universe.maxX; x++) {
        if (!universe.getCol(x).includes('#')) emptyCols.push(x);
    }
    for (let y = 0; y <=universe.maxY; y++) {
        if (!universe.getRow(y).includes('#')) emptyRows.push(y);
    }
    console.log(`empty rows : ${emptyRows}, empty cols : ${emptyCols}, galaxy after expansion =`);

    //emptyCols.forEach(x => universe.insertColumnAt(x, '.'));
    //emptyRows.forEach(y => universe.insertRowAt(y, '.'));
    //universe.logToConsole(c => c!);

    // get the galaxy coordinates
    const E = 1000000-1;
    const galaxies = [] as { x: number, y: number }[]
    console.log(`Galaxies:`);
    for (let X = 0; X <= universe.maxX; X++) {
        for (let Y = 0; Y <= universe.maxY; Y++) {
            if (universe.cells[X][Y] == '#') {
                const expansionOffestX = emptyCols.filter(x => x < X).length * E;
                const expansionOffestY = emptyRows.filter(y =>y < Y ).length  * E;
                galaxies.push({ x: X + expansionOffestX, y: Y + expansionOffestY });
                //console.log(`(${X},${Y}) => (${X} + ${expansionOffestX},${Y} + ${expansionOffestY}) => (${X+expansionOffestX},${Y+expansionOffestY})`);
            }
        }
    }
    console.log(`Pairing...`);
    const galaxyPairs = [] as { g1: { x: number, y: number }, g2: { x: number, y: number } }[];
    const galaxyPairNames = new Set<string>();
    galaxies.forEach(g1 => galaxies.forEach(g2 => {
        if ((g2 != g1) && !(galaxyPairNames.has(`(${g2.x},${g2.y})(${g1.x},${g1.y})`))) {
            galaxyPairs.push({ g1, g2 });
            galaxyPairNames.add(`(${g1.x},${g1.y})(${g2.x},${g2.y})`);
        }
    }));

    console.log(`Found ${galaxyPairs.length} pairs of galaxies:`);
    const galaxyPairMinimumDistances = galaxyPairs.map(p => Math.abs(p.g2.x - p.g1.x) + Math.abs(p.g2.y - p.g1.y));

    //galaxyPairNames.forEach((p,i) => console.log(`${('0' + i).slice(-4)} : ${p} : ${galaxyPairMinimumDistances[i]}`))
    //console.log(`Distances : ${galaxyPairMinimumDistances}`);
    let solution = galaxyPairMinimumDistances.reduce((a, b) => a + b);
    console.log(`${galaxyPairs.length} pairs add to ${solution}`)
    return `${solution}`;
}