///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day12";
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
    entries.forEach(entry => {
        const s1 = entry.split(' ');

        const naturalGroups = s1[0].split('.');
        const groupSizes = s1[1].split(',').map(s => parseInt(s));
        console.log(`${s1[0]} - groups [${groupSizes}]`)
        const combinations = [] as number[];
        naturalGroups.forEach((originalNaturalGroup, i) => {
            let indexInOriginalGroup = 0;
            while (indexInOriginalGroup < originalNaturalGroup.length) {
                let naturalGroup = originalNaturalGroup.substring(indexInOriginalGroup);
                console.log(`...${indexInOriginalGroup} in "${originalNaturalGroup}" => "${naturalGroup}", remaining groups = [${groupSizes}]`)
                
                const thisGroupSizes = [];
                let maxGroupSize = 0;
                
                while (groupSizes.length > 0 && (maxGroupSize + groupSizes[0]) <= naturalGroup.length){
                    console.log(`...... while (${groupSizes.length} > 0 && (${maxGroupSize} + ${groupSizes[0]}) <= ${naturalGroup.length}) ...`)
                    const nextGroupSize = groupSizes.shift()!;
                    thisGroupSizes.push(nextGroupSize);
                    maxGroupSize += nextGroupSize;
                } 
                console.log(`...... while (${groupSizes.length} > 0 && (${maxGroupSize} + ${groupSizes[0]}) < ${naturalGroup.length}) DONE`)
                const group = naturalGroup.substring(0, maxGroupSize+1);
                console.log(`...... looking at breaking '${group}' into [${thisGroupSizes}] groups`)
                indexInOriginalGroup += maxGroupSize+1;
                combinations.push(calculateCombinations(group, thisGroupSizes));
            }

        });
    });
    return `???`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    let solution = '???'
    return `${solution}`;
}

/// 
export function calculateCombinations(group: string, groupSizes: number[]): number {
    console.log(`calculateCombinations(${group}, [${groupSizes}])...`);
    let combinations = [] as number[];
    let subGroup = group;
    if(group.indexOf('#') < 0) combinations.push(factorial(group.length - sum(groupSizes)));
    console.log(`calculateCombinations(${group}, [${groupSizes}]) : [${combinations}]`);
    return sum(combinations);
}

export function  factorial(n:number) : number{
    let factorial = n;
    while(n-- > 0) factorial+= n;
    return factorial;
}

export function  sum(numbers:number[]) : number{
    return numbers.reduce((a,b) => a+b);
}
