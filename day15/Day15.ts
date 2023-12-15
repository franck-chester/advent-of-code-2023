///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day15";
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
export function hash(string : string) : string{
    return string.split('').reduce((previous, current, index) => `${((parseInt(previous) + current.charCodeAt(0))*17)%256}`, "0" );
}
function part1Implementation(entries: string[]) {
    let solution = 0;
    entries.flatMap(entry => entry.split(',')).forEach(e => solution+= parseInt(hash(e)));
    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    let solution = '???'
    return `${solution}`;
}