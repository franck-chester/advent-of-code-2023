///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day08";
export function part1(entries: string[]): string { return part1Implementation(entries); };
part1.day = day;
part1.testFile = 'test01.txt';
part1.example = '???';
part1.inputFile = 'input.txt';

export function part2(entries: string[]): string { return part2Implementation(entries); };
part2.day = day;
part2.testFile = 'test02.txt';
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
    let stepsSoFar = 0
    let steps = entries[0].split('').map(s => s == 'R'?1:0);
    const mod = steps.length

    const map = new Map<string,string[]>();
    const m = /(?<start>.*) = \((?<left>.*), (?<right>.*)\)/
    for(let i=2; i<entries.length; i++){
        const matches = m.exec(entries[i]);
        map.set(matches?.groups?.start!, [matches?.groups?.left!,matches?.groups?.right!]);
    }

    let locations = Array.from(map.keys()).filter(k => k.endsWith('A'));
    const reached = [] as number[];
    // lets run until we've successfully cycled to a winning location at least once for all locations
    while(reached.length < locations.length){ 
        const direction = steps[stepsSoFar % mod];
        stepsSoFar ++;
        for(let l = 0; l<locations.length; l++){ // for each current location
            const newLocation = map.get(locations[l])![direction];
            locations[l] = newLocation;
            if(newLocation.endsWith('Z')        // reached an end location
            && !reached.includes(stepsSoFar)){  // in a number of step never taken before
                reached.push(stepsSoFar)
            }
                
        }
        if(stepsSoFar % 100 == 0) console.log(`${stepsSoFar} : Number of steps required to reach an end location: ${JSON.stringify(reached)}`)
    }
    // these are overlapping cycles, is there a common frequency, i.e.a least common multiple?
    console.log(`Number of steps required to reach an end location: ${JSON.stringify(reached)}`)
    const solution = reached.reduce((a,b) => leastCommonMultiple(a,b));
    console.log(`minimum number of step to cycle through all: ${solution}`)
    return `${solution}`;
}
// https://en.wikipedia.org/wiki/Least_common_multiple#Using_the_greatest_common_divisor
function leastCommonMultiple(a: number, b:number) : number{
    return (a*b)/greatestCommonDenominator(a, b);
}

// https://en.wikipedia.org/wiki/Greatest_common_divisor#Euclidean_algorithm
function greatestCommonDenominator(a: number, b:number) : number{
    return b > 0 ? greatestCommonDenominator(b, a % b) : a;
}

