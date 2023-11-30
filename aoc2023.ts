import { Day } from "./lib/Day";
import { Day00 } from './day00/Day00';
// import { Day02 } from './day02/Day02';
// import { Day03 } from './day03/Day03';
// import { Day04 } from './day04/Day04';
// import { Day05 } from './day05/Day05';
// import { Day06 } from './day06/Day06';
// import { Day07 } from './day07/Day07';
// import { Day08 } from './day08/Day08';
// import { Day09 } from './day09/Day09';
// import { Day10 } from './day10/Day10';

var day: Day;

let isPart2 = process.argv.length > 2 &&   '2' == process.argv[3];
let isTest = process.argv.length == 4 && 'test' == process.argv[3]?.toLowerCase()
         || (process.argv.length == 5 && 'test' == process.argv[4]?.toLowerCase());

switch (process.argv[2]) {
    case "1": day = new Day00(isTest);break;
    // case "2": day = new Day02(isTest);break;
    // case "3": day = new Day03(isTest);break;
    // case "4": day = new Day04(isTest);break;
    // case "5": day = new Day05(isTest);break;
    // case "6": day = new Day06(isTest);break;
    // case "7": day = new Day07(isTest);break;
    // case "8": day = new Day08(isTest);break;
    // case "9": day = new Day09(isTest);break;
    // case "10": day = new Day10(isTest);break;
    case "test":
    default: {
        console.log("You must specify a day : ts-node aoc2022.ts <day index> [test]");
        process.exit(-1);
    }
}


day.readEntries().then(() => {
    console.log(`\n\n SOLUTION ${isTest? "FOR TEST" : ""} ${day.day} part ${isPart2? '2' : 1} : calculated ${isPart2? day.part2(day.entries) : day.part1(day.entries)}`);
    if(isTest){
        console.log(` SOLUTION ${isTest? "FOR TEST" : ""} ${day.day} part ${isPart2? '2' : 1} : expected   ${isPart2? day.part2Example() : day.part1Example()}`);
    }
});

