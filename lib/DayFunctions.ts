import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

export async function readAndReturnEntries(inputFilename: string, basePath : string) : Promise<string[]>  {
    return await processLines(path.resolve(basePath, `${basePath}/${inputFilename}`));
}

async function processLines(inputFilename: string) {
    const rl = readline.createInterface({
        input: fs.createReadStream(inputFilename),
        crlfDelay: Infinity
    });

    const processedLines = [];
    for await (const line of rl) {
        console.log(line);
        processedLines.push(line);
    }
    return processedLines;
}
