///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day08";
export function part1(entries: string[]): string { return part1Implementation(entries); };
part1.day = day;
part1.testFile = 'test01.txt';
part1.example = '6';
part1.inputFile = 'input.txt';

export function part2(entries: string[]): string { return part2Implementation(entries); };
part2.day = day;
part2.testFile = 'test02.txt';
part2.example = '6';
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

// https://en.wikipedia.org/wiki/Least_common_multiple#Using_the_greatest_common_divisor
function leastCommonMultiple(a: number, b:number) : number{
    return (a*b)/greatestCommonDenominator(a, b);
}

// https://en.wikipedia.org/wiki/Greatest_common_divisor#Euclidean_algorithm
function greatestCommonDenominator(a: number, b:number) : number{
    return b > 0 ? greatestCommonDenominator(b, a % b) : a;
}

// Refactored this from my first working solution to make it clearer
// that it all depends on the pattern hidden in the data, namely:
// The data is cyclic A =[c]=> Z =[c]=> Z =[c]=> Z
// Which means the solution if the least common multiple of the cycles for each starting position
// Otherwise the solution would NOT work!!
function part2Implementation(entries: string[]) {
    let stepsSoFar = 0
    let instructions = entries[0].split('').map(s => s == 'R'?1:0);
    const numberOfInstructions = instructions.length

    const map = new Map<string,{
        location : string,
        lr: string[],
        isStart : boolean,         // true if ends in A
        isEnd : boolean,             // true if end in Z
        stepsToNext : number,        // from this location, how many steps to the next start or end location
        next : string | undefined
    }>();
    const m = /(?<location>.*) = \((?<left>.*), (?<right>.*)\)/
    for(let i=2; i<entries.length; i++){
        const matches = m.exec(entries[i]);
        const location = matches?.groups?.location!
        map.set(location, {
            location, 
            lr: [matches?.groups?.left!,matches?.groups?.right!],
            isStart : location.endsWith('A'),         // true if ends in A
            isEnd : location.endsWith('Z') ,            // true if end in Z
            stepsToNext : -1  ,                          // from this location, how many steps to the next start or end location
            next : undefined
        } );
    }

    let startLocations = Array.from(map.values()).filter(location => location.isStart);
    for(let i = 0; i<startLocations.length; i++){
        // traverse each start location once and log the result
        let steps = 0;
        let location = startLocations[i];
        
        while (!location.isEnd){
            const direction = instructions[steps % numberOfInstructions];
            const newLocation = map.get(location.lr[direction])!;
            //console.log(`${location.location} ==[${direction == 0 ? 'L' : 'R'}]==> ${newLocation.location}`);
            location = newLocation;
            steps++
        }
        startLocations[i].stepsToNext = steps;
        startLocations[i].next = location.location;
        
    }
    startLocations.forEach((location, i) => {
        console.log(`start location [${i}] : ${JSON.stringify(location)}\n ${location.stepsToNext}/${numberOfInstructions} = ${location.stepsToNext / numberOfInstructions} ,  ${location.stepsToNext} mod ${numberOfInstructions} = ${location.stepsToNext % numberOfInstructions}`);
    });

    let endLocations = startLocations.map(location => map.get(location.next!)!);

    for(let i = 0; i< endLocations.length; i++){
        // pick up  from the end location, and step til the next start location
        let steps = (startLocations[i].stepsToNext % numberOfInstructions)+1;
        let d = instructions[steps % numberOfInstructions];
        let location = map.get(endLocations[i].lr[d])!;
        // console.log(`${endLocations[i].location} ==[${d == 0 ? 'L' : 'R'}]==> ${location.location}`);
        while (!(location.isStart || location.isEnd)){
            const direction = instructions[steps % numberOfInstructions];
            const newLocation = map.get(location.lr[direction])!;
            //console.log(`${location.location} ==[${direction == 0 ? 'L' : 'R'}]==> ${newLocation.location}`);
            location = newLocation;
            steps++
            // if(steps % 10000 == 0){
            //     console.log(`End location [${i}] : ${steps} so far, location = ${location.location}...`);
            // }
        }
        endLocations[i].stepsToNext = steps;
        endLocations[i].next = location.location;  
        console.log(`end location [${i}] : ${JSON.stringify(location)}\n ${location.stepsToNext}/${numberOfInstructions} = ${location.stepsToNext / numberOfInstructions} ,  ${location.stepsToNext} mod ${numberOfInstructions} = ${location.stepsToNext % numberOfInstructions}`);
    }
    const backToStart= [] as boolean[];
    const fullCircle = [] as boolean[];
    const regularCycle = [] as boolean[];
    const fullSetOfInstructions = [] as boolean[];
    endLocations.forEach((location, i) => {
        console.log(`end location [${i}] : ${JSON.stringify(location)}\n ${location.stepsToNext}/${numberOfInstructions} = ${location.stepsToNext / numberOfInstructions} ,  ${location.stepsToNext} mod ${numberOfInstructions} = ${location.stepsToNext % numberOfInstructions}`);
        backToStart.push(location.next == startLocations[i].location);
        fullCircle.push(location.next == location.location);
        regularCycle.push(location.stepsToNext == startLocations[i].stepsToNext);
        fullSetOfInstructions.push(0 == location.stepsToNext % numberOfInstructions);
    });

    console.log(`have we gone back to start (Z->A)? ${backToStart}`);
    console.log(`have we gone back to full circle to the same end point (Z->Z)?? ${fullCircle}`);
    console.log(`and did it take as many steps from A->Z than Z -> Z ?? ${regularCycle}`);
    console.log(`and was it always a number of full cycle through the instructions ?? ${fullSetOfInstructions}`);

    const cyclesFound = backToStart.map((a,i) => a || fullCircle[i]);
    
    if(cyclesFound.reduce((a,b) => a && b) && regularCycle.reduce(((a,b) => a && b))){
        const frequencies = startLocations.map(location => location.stepsToNext );
        const cycles = startLocations.map(location => `${location.location} =[${location.stepsToNext} steps] => ${location.next}`  );
        console.log(`\n\nThe legend is right, all start positions cycle back to an end position at a fixed frequency :\n${frequencies}`);
        cycles.forEach(c => console.log(c));
        const solution = frequencies.reduce((a,b) => leastCommonMultiple(a,b));
        return `${solution}`
    }

    throw "They lied to us, the data doesn't follow a pattern!!!!"
}
