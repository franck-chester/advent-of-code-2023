///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day09";
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
    let solution = 0;
    for (let i = 0; i < entries.length; i++) {
        console.log(`-- [${i}] -----------------------`)
        let values = [entries[i].split(' ').map(e => parseInt(e))];

        let j = 0;
        while (values[j].filter(v => v != 0).length > 0) {
            console.log(values[j].join(' '));
            values.push([]);
            for (let k = 1; k < values[j].length; k++) {
                values[j + 1].push(values[j][k] - values[j][k - 1])
            }
            j++;
        }
        console.log(values[j].join(' '));
        values[j].push(0);
        console.log(`  ===`);
        console.log(values[j].join(' '));
        for (j--; j >= 0; j--) {
            console.log(values[j].join(' '));
            let k = values[j].length -1
            values[j].push(values[j + 1].pop()! + values[j][k]);
        }
        console.log(values[0].join(' '));
        solution+=values[0].pop()!;
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