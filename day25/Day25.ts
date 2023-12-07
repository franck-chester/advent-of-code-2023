///////////////////
// BOILER PLATE  //
///////////////////
const day = 'Day25';
export function part1(entries: string[]): string { return part1Implementation(entries); };
part1.day = day;
part1.testFile = 'test.txt';
part1.example = '288';
part1.inputFile = 'input.txt';

export function part2(entries: string[]): string { return part2Implementation(entries); };
part2.day = day;
part2.testFile = 'test.txt';
part2.example = '71503';
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
export interface Race {
    time: number,
    distance: number
}

export function calculateMaxDistanceForHold(hold: number, race: Race): number {
    return hold * (race.time - hold);
}

export function calculateOptions(race: Race): number[] {
    const result = [];

    for (let hold = 0; hold < race.time; hold++) {
        const maxDistance = calculateMaxDistanceForHold(hold, race);
        if (maxDistance > race.distance) {
            result.push(hold);
            continue;
        }
    }
    console.log(`calculateOptions(${JSON.stringify(race)}) = ${result.length} options`);
    return result;
}
function part1Implementation(entries: string[]) {
    const times = entries[0].split(/\s+/).slice(1).map(e => parseInt(e));
    const distances = entries[1].split(/\s+/).slice(1).map(e => parseInt(e));
    const races = [] as Race[];
    times.forEach((t, i) => races.push({ time: times[i], distance: distances[i] }));

    let solution = 1;
    races.forEach(r => solution *= calculateOptions(r).length);
    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    const time = parseInt(entries[0].split(/\s+/).slice(1).join(''));
    const distance = parseInt(entries[1].split(/\s+/).slice(1).join(''));
    const race = { time, distance }
    let solution = calculateOptions(race).length;
    return `${solution}`;
}
