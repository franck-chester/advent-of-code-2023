///////////////////
// BOILER PLATE  //

import { oppositeDirection, stepId } from "../lib/Path";
import { Direction } from "../lib/Path";
import { Grid } from "../lib/Grid";
import { Path, Step } from "../lib/Path";

///////////////////
const day = "Day17";
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

type CityBlock = { x: number, y: number, heatLoss: number, visited: boolean };
class ZigZagPath extends Path {
    stepsSoFar: number;

    constructor(stepsSoFar: number, ...items: Step[]) {
        super(...items);
        this.stepsSoFar = stepsSoFar;

    }

    clone(): ZigZagPath{
        return new ZigZagPath(this.stepsSoFar, ...this.map((step) => {
            return {
              x: step.x,
              y: step.y,
              direction: step.direction
            };
          }));
    }
}

function part1Implementation(entries: string[]) {
    let solution = '???'
    const grid = Grid.fromEntries(entries, (c, x, y) => { return { x: x!, y: y!, heatLoss: parseInt(c), visited: false } });

    const paths = [] as ZigZagPath[];
    paths.push(new ZigZagPath(1, { x: grid.getCell(0, 0)!.x!, y: grid.getCell(0, 0)!.y!, direction: 0 }));

    const completedPaths = [] as Path[];
    let steps = 0;
    const previousStepIds = new Set<string>();
    const pathsToDelete = [] as number[];
    while (paths.length > 0) {
        steps++;
        if (steps % 100 == 0) console.log(`${steps} : ${paths.length} paths so far...`);

        // delete invalid paths outside the loop!
        while (pathsToDelete.length > 0) {
            const p = pathsToDelete.pop()!;
            paths.splice(p, 1);
        }
        for (let p = 0; p < paths.length; p++) {

            const path = paths[p];
            const tail = path.at(-1)!;
            if (p % 100 == 0) console.log(`${steps} - ${p}/${paths.length} : TAIL : ${JSON.stringify(tail)} ...`);


            let possibleNextSteps = calculatePossibleNextSteps(grid, tail, path, previousStepIds);

            if (possibleNextSteps.length == 0) {
                //console.log(`${steps} :   hit impasse at ${JSON.stringify(tail)} - marking path [${p}] of ${paths.length} for removal `)
                pathsToDelete.push(p);
                continue;
            }

            // split the path
            // make the copy in a separate the loop otherwise we endup referring the same path reference again and again (
            const newPaths = [path] as ZigZagPath[];
            possibleNextSteps.forEach((step, i) => {
                if (i > 0) {
                    newPaths.push(path.clone());
                }
            });
            possibleNextSteps.forEach((step, i) => {
                const thisPath = newPaths[i];
                thisPath.stepsSoFar = (tail.direction != step.direction)? 1 : thisPath.stepsSoFar+1;
                thisPath.push(step);
                previousStepIds.add(stepId(step));

                if (step.x == grid.maxX && step.y == grid.maxY) {
                    // we've arrived, stop processing this path but save it
                    console.log(`${steps} :   WE'VE ARRIVED :  ${JSON.stringify(step)} - marking path [${p}] of ${paths.length} for removal `)
                    pathsToDelete.push(p + i);
                    completedPaths.push(thisPath);
                }

            });
            paths.push(...newPaths.slice(1));

            //sort the paths by length
        }
    }

    console.log(`Found ${completedPaths.length} possible paths:`);
    completedPaths.forEach((path, i) => {
        let heatLoss = 0;
        const map = new Grid<string>(grid.width, grid.height, '.');
        path.forEach(step => {
            heatLoss += grid.getCell(step.x, step.y)!.heatLoss;
            map.setCell(step.x, step.y, translateDirection(step.direction));
            //console.log(`PATH ${i} : x= ${step.x}, y= ${step.y}, direction = ${step.direction} (${translateDirection(step.direction)})`)
        });
        console.log(`PATH ${i} : ${path.length} steps - total heat loss = ${heatLoss}`);
        map.logToConsole(c => c!);
    });

    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    let solution = '???'
    return `${solution}`;
}

function calculatePossibleNextSteps(grid: Grid<CityBlock>, location: { x: number; y: number; direction: Direction; }, path: ZigZagPath): Step[] {
    const possibleNextSteps = new Map<Direction, Step>();

    let reasons = `      hit impasse at ${JSON.stringify(location)} : `

    // start with all possible directions
    // can we go right?
    if (location.x < grid.maxX) {
        possibleNextSteps.set(Direction.Right, { x: location.x + 1, y: location.y, direction: Direction.Right });
    }

    // can we go down?
    if (location.y < grid.maxY) {
        possibleNextSteps.set(Direction.Down, { x: location.x, y: location.y + 1, direction: Direction.Down })
    }

    // can we go left?
    if (location.x > 0) {
        possibleNextSteps.set(Direction.Left, { x: location.x - 1, y: location.y, direction: Direction.Left })
    }

    // can we go up?
    if (location.y > 0) {
        possibleNextSteps.set(Direction.Up, { x: location.x, y: location.y - 1, direction: Direction.Up })
    }

    // possibleNextSteps.forEach(s => {
    //     if(s.x == 12 && s.y==12) console.log ("What is stopping me from reaching the end???");
    // });
    // now apply the rules
    /// Can't go back
    possibleNextSteps.delete(oppositeDirection(location.direction));
    reasons += `!${oppositeDirection(location.direction)} not back, `;

    if (path.stepsSoFar == 3) {
        // we must turn
        possibleNextSteps.delete(location.direction);
        reasons += `!${location.direction} must turn, `;
    }

    // can't cross our own path or revisit a previously attempted step
    const toBeDeleted = [] as Direction[];
    possibleNextSteps.forEach(step => {
        if (path.isCrossedBy(step)){// || previousStepIds.has(stepId(step))) {
            toBeDeleted.push(step.direction);
            reasons += `!${step.direction} x-path, `;
        }
    });
    toBeDeleted.forEach(direction => possibleNextSteps.delete(direction));

    if (possibleNextSteps.size == 0) {
        //console.log(reasons);
    }

    return Array.from(possibleNextSteps.values());
}

function translateDirection(direction: Direction): string {
    return ['>', 'V', '<', '^'].at(direction)!;
}

