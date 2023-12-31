///////////////////
// BOILER PLATE  //

import { Grid } from "../lib/Grid";

///////////////////
const day = "Day21";
export function part1(entries: string[], isTest?: boolean, testNumber?: number): string { return part1Implementation(entries, isTest, testNumber); };
part1.day = day;
part1.testFile = 'test.txt';
part1.example = '16';
part1.inputFile = 'input.txt';

export function part2(entries: string[]): string { return part2Implementation(entries); };
part2.day = day;
part2.testFile = 'test.txt';
part2.example = '???';
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
type Node = { isPlot: boolean, x: number, y: number, tentativeDistance: number };
function part1Implementation(entries: string[], isTest?: boolean, testNumber?: number) {
    let current: { x: number, y: number } | undefined;
    const grid = Grid.fromEntries(entries, (c, x, y) => {
        const node = { isPlot: (['.', 'S'].includes(c)), x: x!, y: y!, tentativeDistance: 0 };
        if (c == 'S') current = node;
        return node;
    });
    if (current == undefined) throw `??`
    const MinStepsToday = isTest? 6 : 64;
    const tails = [current] as Node[];
    let total = 0;
    let step = 1;
    while (tails.length > 0) {

        const t = tails.shift()!;
        const right = t.x < grid.maxX ? grid.getCell(t.x + 1, t.y) : undefined;
        const down = t.y < grid.maxY ? grid.getCell(t.x, t.y + 1) : undefined;
        const left = t.x > 0 ? grid.getCell(t.x - 1, t.y) : undefined;
        const up = t.y > 0 ? grid.getCell(t.x, t.y - 1) : undefined;
        const stepsSoFar = t.tentativeDistance;
        [right, down, left, up].forEach(nextPossibleStep => {
            if (nextPossibleStep != undefined               // possible direction
                && nextPossibleStep.isPlot                  // valid direction
                && nextPossibleStep.tentativeDistance == 0) { // somewhere we haven't been before
                nextPossibleStep.tentativeDistance = stepsSoFar + 1;
                if (nextPossibleStep.tentativeDistance < MinStepsToday) {
                    tails.push(nextPossibleStep);
                }
                if (nextPossibleStep.tentativeDistance <= MinStepsToday
                    && nextPossibleStep.tentativeDistance % 2 == 0) {
                    total++;
                }
            }
        });

        if(isTest){
            console.log(`After ${step} step(s):`)
            grid.logToConsole(c => c!.isPlot ? `${c?.tentativeDistance}` : '#');
        }
        step++;

    }

    console.log(`All these can be reached in exactly  ${MinStepsToday} steps:`)
    grid.logToConsole(c => c!.tentativeDistance == MinStepsToday ? 'O' : (c!.isPlot ? `.` : '#'));

    let solution = total;
    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    let solution = '???'
    return `${solution}`;
}