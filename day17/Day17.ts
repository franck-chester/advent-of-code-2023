///////////////////
// BOILER PLATE  //

import { oppositeDirection } from "../lib/Grid";
import { Direction } from "../lib/Grid";
import { Path, Grid, Step } from "../lib/Grid";

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
function part1Implementation(entries: string[]) {
    let solution = '???'
    const grid = Grid.fromEntries(entries, (c, x, y) => { return { x: x!, y: y!, heatLoss: parseInt(c), visited: false } });

    const paths = [] as Path[];
    paths.push([{ x: grid.getCell(0, 0)!.x!, y: grid.getCell(0, 0)!.y!, direction: 0 }]);
    const completedPaths = [] as Path[];
    let steps = 0;
    let continuousStepsForPaths = [1] as number[];
    do {
        if (steps % 100 == 0) console.log(`${steps} : TAILS : ${JSON.stringify(paths)}`);
        for (let p = 0; p < paths.length; p++) {

            const path = paths[p];
            const continuousStepsForPath = continuousStepsForPaths[p];
            const tail = path.at(-1)!;
            if (p % 100 == 0) console.log(`${steps} - ${p} continuousStepsForPath = ${continuousStepsForPath}: TAIL : ${JSON.stringify(tail)} ...`);
            if (tail.x == grid.maxX && tail.y == grid.maxY) {
                // we've arrived, stop processing this path but save it
                completedPaths.push(paths.splice(p, 1)[0]);
                continue;
            }
            if (tail.x < 0 || tail.x > grid.maxX || tail.y < 0 || tail.y > grid.maxY) {
                console.log(`${steps} :   hit wall at ${JSON.stringify(tail)} - removing path [${p}] : `)
                paths.splice(p, 1);
                continue;
            }

            let possibleNextSteps = calculatePossibleNextSteps(grid, tail, continuousStepsForPath);
            // split the path
            // make the copy outside the loop otherwise we endup referring the same path reference again and again (
            const pathCopy = path.map((step) => {
                return {
                    x:step.x,
                    y: step.y,
                    direction : step.direction
                }
            });
            possibleNextSteps.forEach((step, i) => {
                if (i > 0) {
                    paths.push(pathCopy.map(step => step));
                    continuousStepsForPaths.push(continuousStepsForPath)
                }
                const thisPath = paths[i];
                thisPath.push(step);

                if (tail.direction == step.direction) {
                    continuousStepsForPaths[p + i]++;
                } else {
                    continuousStepsForPaths[p + i] = 1;
                }

            });

        }
    } while (paths.length > 0);

    completedPaths.forEach((path, i) => console.log(`${i} : ${path.length} steps`))

    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    let solution = '???'
    return `${solution}`;
}
function calculatePossibleNextSteps(grid: Grid<CityBlock>, location: { x: number; y: number; direction: Direction; }, continuousStepsForPath: number): Step[] {
    const possibleNextSteps = new Map<Direction, Step>();

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

    // now apply the rules
    /// Can't go back
    possibleNextSteps.delete(oppositeDirection(location.direction));

    if (continuousStepsForPath == 3) {
        // we must turn
        possibleNextSteps.delete(location.direction);
    }

    // can revisit somewhere we've already been
    possibleNextSteps.forEach((step, direction) => {
        if(grid.getCell(step.x, step.y)!.visited){
              possibleNextSteps.delete(direction)
        }else{
            grid.getCell(step.x, step.y)!.visited = true;
        }
    });

    return Array.from(possibleNextSteps.values());
}

