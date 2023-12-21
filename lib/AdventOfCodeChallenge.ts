import * as path from "path";
import * as fs from 'fs';
import * as readline from 'readline';

export async function readEntriesFromDataFile(dataFilePath : string) : Promise<string[]> {
    const rl = readline.createInterface({
        input: fs.createReadStream(dataFilePath),
        crlfDelay: Infinity
    });
    const processedLines = [] as string[];
    for await (const line of rl) {
        console.log(line);
        processedLines.push(line);
    }
    return processedLines;
}

export type AdventOfCodeChallenge = {
    (entries: string[], isTest? : boolean, testNumber?:number): string;
    day: string;
    testFile: string | string[];
    example: string | string[];
    inputFile: string;
};

export function determineDataFileName(adventOfCodeChallenge: AdventOfCodeChallenge, isTest : boolean, testNumber = 0) {
    console.log(`determineDataFileName (isTest = ${isTest})...`);
    if(testNumber > 0 ){
        const dataFileNames = adventOfCodeChallenge[isTest ? 'testFile' : 'inputFile'];
        console.log(`picking test ${testNumber} (index ${testNumber-1} in ${dataFileNames} = ${dataFileNames[testNumber-1]}`)
        return path.resolve(__dirname, `../${adventOfCodeChallenge.day}/${dataFileNames[testNumber-1]}`);
    }
    const dataFileName = adventOfCodeChallenge[isTest ? 'testFile' : 'inputFile'];
    const dataFilePath = path.resolve(__dirname, `../${adventOfCodeChallenge.day}/${dataFileName}`);
    return dataFilePath;
}

