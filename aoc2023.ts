import { Day } from "./lib/Day";
import { Day01 } from './day01/Day01';
import { Day02 } from './day02/Day02';
import { Day03 } from './day03/Day03';
import { Day04 } from './day04/Day04';
import { Day05 } from './day05/Day05';
import { Day06 } from './day06/Day06';
import { Day07 } from './day07/Day07';
// end imports

var day: Day;

let isPart2 = process.argv.length > 2 &&   '2' == process.argv[3];
let isTest = process.argv.length == 4 && 'test' == process.argv[3]?.toLowerCase()
         || (process.argv.length == 5 && 'test' == process.argv[4]?.toLowerCase());

switch (process.argv[2]) {
    case "1": day = new Day01(isTest);break;
    case "2": day = new Day02(isTest);break;
    case "3": day = new Day03(isTest);break;
    case "4": day = new Day04(isTest);break;
    case "5": day = new Day05(isTest);break;
    case "6": day = new Day06(isTest);break;
    case "7": day = new Day07(isTest);break;
    case "test":
    default: {
        console.log("You must specify a day : ts-node aoc2022.ts <day index> [test]");
        process.exit(-1);
    }
}
const startTime = performance.now();
day.readAndReturnEntries(isTest?(isPart2?day.testFilePart2():day.testFilePart1()):'input.txt').then((entries) => {
    console.log(`\n\n ${'-'.repeat(80)}\n SOLUTION ${isTest? "FOR TEST" : ""} ${day.day} part ${isPart2? '2' : 1} : calculated ${isPart2? day.part2(entries) : day.part1(entries)}`);
    if(isTest){
        console.log(` SOLUTION ${isTest? "FOR TEST" : ""} ${day.day} part ${isPart2? '2' : 1} : expected   ${isPart2? day.part2Example() : day.part1Example()}`);
    }
    const endTime = performance.now();
    console.log(` Time elapsed : ${Math.round(endTime-startTime)} ms`);
});

