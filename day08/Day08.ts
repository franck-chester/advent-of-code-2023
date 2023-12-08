///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day08";
export function part1(entries: string[]): string { return part1Implementation(entries); };
part1.day = day;
part1.testFile = 'test.txt';
part1.example = '???';
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
    let steps = entries[0].split('').map(s => s == 'R'?1:0);
    const map = new Map<string,string[]>();
    const m = /(?<start>.*) = \((?<left>.*), (?<right>.*)\)/
    for(let i=2; i<entries.length; i++){
        const matches = m.exec(entries[i]);
        map.set(matches?.groups?.start!, [matches?.groups?.left!,matches?.groups?.right!]);
    }

    let location = 'AAA';
    const mod = steps.length
    while (location  != 'ZZZ'){
        const direction = steps[solution % mod];
        const newLocation = map.get(location)![direction]
        console.log(`${location} ==[${direction == 0 ? 'L' : 'R'}]==> ${newLocation}`)
        location = newLocation;
        solution++;
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