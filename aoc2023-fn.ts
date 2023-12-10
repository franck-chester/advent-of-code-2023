import { determineDataFileName, readEntriesFromDataFile } from "./lib/AdventOfCodeChallenge";

if (process.argv.length < 3) {
    console.log("Missing argument. Cmd should look like  ts-node aoc2022.ts <day> 1|2 [test]");
    console.log("                                  e.g.  ts-node aoc2022.ts 7 1       : execute part 1 of day 7 with the actual data");
    console.log("                                  e.g.  ts-node aoc2022.ts 8 2 test  : execute part 1 of day 8 with the example data");
    process.exit(-1);
}
const dayId = parseInt(process.argv[2]);
const dayName = String(dayId).padStart(2, '0');

const partId = parseInt(process.argv[3]);
const isTest = (process.argv.length > 4  && 'test' == process.argv[4]?.toLowerCase());
const testNumber = process.argv.length > 5 ?  parseInt(process.argv[5]?.toLowerCase()) : 0;

if (dayId < 7) {
    console.log(`Invalid day '${dayName}' This refactored aoc2022.ts only works with days 07 and onwards `);
    process.exit(-1);
}

if (!(partId == 1 || partId == 2)) {
    console.log(`Invalid Part '${partId}'. Cmd should look like ts-node aoc2022.ts <day> 1|2 [test]`);
    process.exit(-1);
}

const modulePath = `./day${dayName}/Day${dayName}`;
import(modulePath).then(dayModule => {
    const adventOfCodeChallenge = dayModule[`part${partId}`];
    const dataFilePath = determineDataFileName(adventOfCodeChallenge, isTest, testNumber);

    const startTime = performance.now();
    console.log(`Day${dayName} - reading from ${dataFilePath}...`);
    console.log(`Day${dayName} - ${isTest ? " vvvvvvvvvvvvvv TEST INPUT vvvvvvvvvvvvvvv" : " vvvvvvvvvvvv REAL INPUT  vvvvvvvvvvvvvvvvv"}`);
    readEntriesFromDataFile(dataFilePath).then(processedLines => {
        console.log(`Day${dayName} - ${isTest ? " ^^^^^^^^^^^^^^^^^ TEST INPUT ^^^^^^^^^^^^^^^" : " ^^^^^^^^^^^^^^ REAL INPUT ^^^^^^^^^^^^^"}`);
        console.log(`Day${dayName} - ${isTest ? " TEST INPUT" : "ACTUAL INPUT"} ${processedLines.length} LINES PROCESSED`);


        const solution = adventOfCodeChallenge(processedLines);
        console.log(`\n\n ${'-'.repeat(80)}\n SOLUTION ${isTest ? "FOR TEST" : ""} Day ${dayName} part ${partId} : calculated ${solution}`);
        if (isTest) {
            console.log(`  SOLUTION ${isTest ? "FOR TEST" : ""} Day ${dayName} part ${partId} : expected ${adventOfCodeChallenge.example} `);
        }
        const endTime = performance.now();
        console.log(` Time elapsed : ${Math.round(endTime - startTime)} ms`);
    });
});



