///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day12";
export function part1(entries: string[]): string { return part1Implementation(entries); };
part1.day = day;
part1.testFile = 'test.txt';
part1.example = '21';
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
    let total = 0;
    entries.forEach(entry => {
        const splitEntry = entry.split(' ');
        const groups = splitEntry[1].split(',').map(c => parseInt(c));
        const potentialRecords = generateAllPotentialRecords(groups, splitEntry[0].length);
        //console.log(`${entry} - ${potentialRecords.length} potential arrangements`)
        //potentialRecords.forEach(r => console.log(r))
        const possibleRecords = filterOutImpossibleRecords(potentialRecords, splitEntry[0]);
        console.log(`${entry} - ${possibleRecords.length} arrangements`)
        total += possibleRecords.length;

    });
    return `${total}`;
}

export function filterOutImpossibleRecords(potentialRecords: string[], conditionRecord: string): string[] {
    const regEx = new RegExp(conditionRecord.replace(/\./g, '\\.').replace(/\?/g, '.'));
    console.log(regEx);
    return potentialRecords.filter(potentialRecord => regEx.test(potentialRecord));
}
export function generateAllPotentialRecords(damagedGroupLengths: number[], recordLength: number): string[] {
    let numberOfGroups = damagedGroupLengths.length;
    const potentialRecords = new Set<string>();

    let potentialRecord = [[]] as string[][]; //start with an empty group of operational ones
    let potentialRecordLength = 0;
    for (let g = 0; g < numberOfGroups; g++) {
        let damagedGroup = [] as string[];
        const damagedGroupLength = damagedGroupLengths[g];
        damagedGroup.length = damagedGroupLength;
        damagedGroup.fill('#');
        potentialRecord.push(damagedGroup);
        potentialRecordLength += damagedGroupLength;
        if ((potentialRecordLength < recordLength) && (g != numberOfGroups - 1)) {
            potentialRecord.push(['.']); // single operational group after each damaged ones, but not the last one
            potentialRecordLength += 1;
        }
    }
    // pad right with operational springs
    let paddingGroup = [] as string[];
    paddingGroup.length = recordLength - potentialRecordLength;
    const paddingGroupLength = recordLength - potentialRecordLength;
    paddingGroup.fill('.');
    //paddingGroup.forEach((e, i) => paddingGroup[i] = `${i + 1}`);  // for debugging purpose only
    potentialRecord.push(paddingGroup);
    //numberOfGroups = potentialRecord.length;

    // first potential record is with all the padding at the end
    potentialRecords.add(potentialRecord.flat().join(''));
    //console.log(`First potentialRecord : ${potentialRecord.flat().join('')}   (${potentialRecords.size})`)
    //console.log(`paddingGroup : ${paddingGroup.join('')} (${recordLength} - ${potentialRecordLength} = ${paddingGroupLength})`)
    const iterations = Array(numberOfGroups + 1); // array tracking the operational groups (including padding left and right)
    iterations.fill(0);
    iterations[0] = 1;  // complete mind fuck this counting backward - here 0 is the last group

    for (let g = 0; g < numberOfGroups; g++) {
        const G = -(g * 2) - 1
        processFountainsAtGroup(potentialRecord, potentialRecords, G, -1, '');
    }


    const result = Array.from(potentialRecords.values());
    // result.forEach(r => console.log(r));
    return result;


}


/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    let solution = '???'
    return `${solution}`;
}



export function factorial(n: number): number {
    let factorial = n;
    while (n-- > 0) factorial += n;
    return factorial;
}

export function sum(numbers: number[]): number {
    return numbers.reduce((a, b) => a + b);
}

function moveNFountainsFromGroupAtoB(potentialRecord: string[][], potentialRecords: Set<string>, n: number, a: number, b: number) {
    // this is pushing and popping ranges rather than individual elements
    // over engineering to help my logging
    potentialRecord.at(b)?.splice(potentialRecord.at(b)!.length, 0, ...potentialRecord.at(a)!.splice(potentialRecord.at(a)!.length - n, n));
    potentialRecords.add(potentialRecord.flat().join(''));
    //console.log(`... after moving ${n} fountains from ${a} to ${b}           : ${potentialRecord.flat().join('')}`)
}



function processFountainsAtGroup(potentialRecord: string[][], potentialRecords: Set<string>, G: number, ResetBackTo : number, logPadding: string) {
    const maxN = potentialRecord.at(G)!.length - (G==-1?0:1);

    //console.log(`${logPadding} processFountainsAtGroup - G=${G}, : ${potentialRecord.flat().join('')} (${maxN} fountains to process)...`)
    

    for (let n = 1; n <= maxN; n++) {
        //console.log(`${logPadding} processFountainsAtGroup - G=${G}, n = ${n}, maxN = ${maxN} : ${potentialRecord.join('|')} before ...`)
        moveNFountainsFromGroupAtoB(potentialRecord, potentialRecords, n, G, G - 2);
        //console.log(`${logPadding} processFountainsAtGroup - G=${G}, n = ${n} : ${potentialRecord.flat().join('')} after`)
        const resetTo = n<maxN ? G : ResetBackTo;
        if (G > (2-potentialRecord.length)) {
            processFountainsAtGroup(potentialRecord, potentialRecords, G - 2, resetTo, logPadding + '-');
        }
        // reset
        
        //console.log(`${logPadding} processFountainsAtGroup : G=${G}, n = ${n}, maxN=${maxN},ResetBackTo = ${ResetBackTo} :  reset back to ${resetTo}`)
        moveNFountainsFromGroupAtoB(potentialRecord, potentialRecords, n, 0, resetTo);
    }

}

