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
    (entries: string[]): string;
    day: string;
    testFile: string;
    example: string;
    inputFile: string;
};

export function determineDataFileName(adventOfCodeChallenge: AdventOfCodeChallenge, isTest : boolean) {
    console.log(`determineDataFileName : ${JSON.stringify(adventOfCodeChallenge, null, 1)}`);
    const dataFileName = adventOfCodeChallenge[isTest ? 'testFile' : 'inputFile'];
    const dataFilePath = path.resolve(__dirname, `../${adventOfCodeChallenge.day}/${dataFileName}`);
    return dataFilePath;
}

