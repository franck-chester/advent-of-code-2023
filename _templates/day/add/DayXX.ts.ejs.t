---
to: day<%= (''+day).padStart(2,'0') %>/Day<%= (''+day).padStart(2,'0') %>.ts
unless_exists: true
---
///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day<%= (''+day).padStart(2,'0') %>";
export function part1(entries: string[], isTest? : boolean, testNumber?:number): string { return part1Implementation(entries, isTest, testNumber); };
part1.day = day;
part1.testFile = 'test.txt';    // ['test01.txt'];
part1.example = '???';          // ['???'];
part1.inputFile = 'input.txt';

export function part2(entries: string[], isTest? : boolean, testNumber?:number): string { return part2Implementation(entries, isTest, testNumber); };
part2.day = day;
part2.testFile = 'test.txt';    // ['test01.txt'];
part2.example = '???';          // ['???'];
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
function part1Implementation(entries: string[], isTest? : boolean, testNumber?:number) {
    let solution = '???'
    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[], isTest? : boolean, testNumber?:number) {
    let solution = '???'
    return `${solution}`;
}