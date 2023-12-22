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
    let solution = 0
    let platform = Grid.fromEntries(entries, (c) => c);
    const ShakingCycles = 1000000000; //
    let cycled = false;
    let positions = new Map<string, number>();
    let c = 1;  // cycle is 1 based!
    let hash = '';
    do {

        hash = platform.cells.flat().join('');
        if (c % 1 == 0) console.log(`Cycle ${c} ...\n position = [${hash}]`);
        if (!cycled && positions.has(hash)) {
            // we've completed a cycle, we can jump ahead

            let cycleLength = c - positions.get(hash)!;

            // let say at position x and x+cycle we end up in the same place
            // 1000 - (x+cycle) is how many shaking cycle are left
            // (1000 - (x+cycle)) % cycles is how many will be left if we ignore the repeats
            
            console.log(`Cycle ${c} : [${hash}]`);
            console.log(`Cycle ${c} - got back to position previously encountered at ${positions.get(hash)} i.e cycle length = ${cycleLength}`)
            console.log(` ${ShakingCycles} - ${c} = ${ShakingCycles-c} remaining cycles out of ${ShakingCycles}`);
            console.log(` ${ShakingCycles-c} % ${cycleLength} = remaining cycles out of ${ShakingCycles} once we've cycled ${(ShakingCycles-c)/cycleLength} times`)
            console.log(` jumping to cycle ${ShakingCycles} - ${(ShakingCycles-c) % cycleLength} = ${ShakingCycles - ((ShakingCycles-c) % cycleLength)}`)
            c = ShakingCycles - ((ShakingCycles-c) % cycleLength);
            cycled = true;
            continue;
        }
        positions.set(hash, c);
        platform = tiltNWSE(platform);;
        c++;
    }
    while (c <= ShakingCycles)

    console.log(`Cycle ${c} ...\n position = [${hash}]`);
    platform.logToConsole(c => c!)
    for (let x = 0; x <= platform.maxX; x++) {

        solution += weight(platform.getCol(x).map(c => c!));
    }
    return `${solution}`;
}

export function tiltNWSE(platform: Grid<string>) {
    let tiltedNorth = new Grid<string>(0, 0, (x,y)=>'');
    for (let x = 0; x <= platform.maxX; x++) {
        tiltedNorth.pushColumn(tilt(platform.getCol(x), 'North'));
    }
    // console.log(`Cycle ${c} - North :`);
    // tiltedNorth.logToConsole(c=>c!);
    // console.log(`Cycle ${c} - West ...`);
    let tiltedWest = new Grid<string>(0, 0, (x,y)=>'');
    for (let y = 0; y <= tiltedNorth.maxY; y++) {
        tiltedWest.pushRow(tilt(tiltedNorth.getRow(y), 'West'));
    }
    // console.log(`Cycle ${c} - West :`);
    // tiltedWest.logToConsole(c=>c!);
    //console.log(`Cycle ${c} - South ...`);
    let tiltedSouth = new Grid<string>(0, 0, (x,y)=>'');
    for (let x = 0; x <= tiltedWest.maxX; x++) {
        tiltedSouth.pushColumn(tilt(tiltedWest.getCol(x), 'South'));
    }

    // console.log(`Cycle ${c} - South :`);
    // tiltedWest.logToConsole(c=>c!);
    //console.log(`Cycle ${c} - East ...`);
    let tiltedEast = new Grid<string>(0, 0, (x,y)=>'');
    for (let y = 0; y <= tiltedSouth.maxY; y++) {
        tiltedEast.pushRow(tilt(tiltedSouth.getRow(y), 'East'));
    }
    return tiltedEast;
}

export function tiltLeft(rowOrColumn: (string | undefined)[]) {
    let tiltedGroups = rowOrColumn.join('').split(/#+/).map((thingsBetweenRocks, i) => thingsBetweenRocks.replaceAll('.', '').padEnd(thingsBetweenRocks.length, '.'));
    let newRowOrColumn = [] as string[];
    let groupOfRocks = false;
    let t = 0
    for (let i = 0; i < rowOrColumn.length; i++) {
        if (rowOrColumn[i] === '#') {
            if (!groupOfRocks) groupOfRocks = true;
            newRowOrColumn.push('#');
            continue;
        };
        groupOfRocks = false;
        newRowOrColumn.push(...(tiltedGroups[t].split('')));
        i += tiltedGroups[t].length - 1;
        t++;
    }
    console.log(`TILT ${rowOrColumn.join('')} => ${newRowOrColumn.join('')}`)
    return newRowOrColumn;
}

export function tilt(rowOrColumn: (string | undefined)[], direction: 'North' | 'East' | 'South' | 'West') {
    try {
        //console.log(`TILT ${direction} "${rowOrColumn.join('')}" ...`)
        const tiltLeft = direction === 'North' || direction === 'West';
        let tiltedGroups = rowOrColumn.join('').split(/#+/).map((thingsBetweenRocks, i) => thingsBetweenRocks.replaceAll('.', '')[tiltLeft ? 'padEnd' : 'padStart'](thingsBetweenRocks.length, '.'));
        let newRowOrColumn = [] as string[];
        let groupOfRocks = false;
        let t = 0
        for (let i = 0; i < rowOrColumn.length; i++) {
            if (rowOrColumn[i] === '#') {
                if (!groupOfRocks) groupOfRocks = true;
                newRowOrColumn.push('#');
                continue;
            };
            groupOfRocks = false;
            newRowOrColumn.push(...(tiltedGroups[t].split('')));
            i += tiltedGroups[t].length - 1;
            t++;
        }
        //console.log(`TILT ${direction} ${rowOrColumn.join('')} => ${newRowOrColumn.join('')}`)
        return newRowOrColumn;
    } catch (e) {
        console.log(`CAN'T TILT ${direction} "${rowOrColumn.join('')}" : ${e}`);
        throw `CAN'T TILT ${direction} ${rowOrColumn.join('')} : ${e}`;
    }
}

export function weight(column: string[]) {
    let weight = 0;
    let maxWeight = column.length;
    column.forEach((c, w) => weight += (c === 'O') ? (maxWeight - w) : 0);

    console.log(` ${weight} weight for ${column.join('')} `)
    return weight;
}

