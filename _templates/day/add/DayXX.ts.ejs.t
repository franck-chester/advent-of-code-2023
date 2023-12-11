---
to: day<%= ('0'+day).slice(-2) %>/Day<%= ('0'+day).slice(-2) %>.ts
unless_exists: true
---
///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day<%= ('0'+day).slice(-2) %>";
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
    let solution = '???'
    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    let solution = '???'
    return `${solution}`;
}