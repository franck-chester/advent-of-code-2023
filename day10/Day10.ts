///////////////////
// BOILER PLATE  //

import { Grid } from "../lib/Grid";

///////////////////
const day = "Day10";
export function part1(entries: string[]): string { return part1Implementation(entries); };
part1.day = day;
part1.testFile = ['test01.txt','test02.txt','test03.txt'];
part1.example = '8';
part1.inputFile = 'input.txt';

export function part2(entries: string[]): string { return part2Implementation(entries); };
part2.day = day;
part2.testFile = 'test.txt';
part2.example = '???';
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
function part1Implementation(entries: string[]) {
    const pipes = Grid.fromEntries<string>(entries, (s) => s);
    pipes.logToConsole('.');
    console.log('----------------------------')
    const distances = new Grid<number>(pipes.maxX + 1, pipes.maxY + 1);
    // find the start
    let x = 0;
    let y = 0;
    let found = false;
    for (x = 0; x <= pipes.maxX; x++) {
        for (y = 0; y <= pipes.maxY; y++) {
            found = pipes.cells[x][y] == 'S';
            if (found) break;
            //console.log(`pipes.cells[${x}][${y}] = ${pipes.getCell(x, y)}`)
        }
        if (found) break;
    }
    console.log(found ? `Found Start at [${x}][${y}]` : "NOT FOUND????");
    distances.setCell(x,y, 0);
    
    // from the start, measure the distance
    followNearestPipes(pipes, distances, x, y,0);

    distances.logToConsole('x');
    let highestDistance = 0;

    for (x = 0; x <= pipes.maxX; x++) {
        for (y = 0; y <= pipes.maxY; y++) {
            const distance = distances.cells[x][y];
            if (distance && distance > highestDistance) highestDistance = distance;
        }
    }


    return `${highestDistance}`;
}

export function followNearestPipes(pipes: Grid<string>, distances: Grid<number>, X: number, Y: number, depth : number): boolean {
    console.log(`followNearestPipes(X: ${X}, Y: ${Y}, , ${depth})...`)
    const centrePipe = pipes.cells[X][Y]!;
    const distanceSoFar = distances.cells[X][Y] ? distances.cells[X][Y]! : 0;
    const valid = validNeighbours(centrePipe);
    const cellOnLeft = X > 0 ? pipes.cells[X - 1][Y] : undefined;
    const cellOnRight = X < pipes.maxX ? pipes.cells[X + 1][Y] : undefined;
    const cellOnTop = Y > 0 ? pipes.cells[X][Y - 1] : undefined;
    const cellOnBottom = Y < pipes.maxY ? pipes.cells[X][Y + 1] : undefined;

    const distanceOnTheLeft = X > 0 ? distances.cells[X - 1][Y] : -1;
    let canGoLeft = cellOnLeft !== undefined && (valid.left.includes(cellOnLeft) && (distanceOnTheLeft === undefined || distanceOnTheLeft! > distanceSoFar + 1 ));
    const distanceOnTheRight = X < pipes.maxX ? distances.cells[X + 1][Y] : -1;
    let canGoRight = cellOnRight !== undefined && (valid.right.includes(cellOnRight) && (distanceOnTheRight === undefined|| distanceOnTheRight! > distanceSoFar + 1 ));
    const distanceOnTheTop =Y > 0 ?  distances.cells[X][Y - 1] : -1;
    let canGoTop = cellOnTop !== undefined && (valid.top.includes(cellOnTop) && (distanceOnTheTop  === undefined|| distanceOnTheTop! > distanceSoFar + 1 ));
    const distanceOnTheBottom = Y < pipes.maxY ? distances.cells[X][Y + 1] : -1;
    let canGoBottom = cellOnBottom !== undefined && (valid.bottom.includes(cellOnBottom) && (distanceOnTheBottom === undefined|| distanceOnTheBottom! > distanceSoFar + 1 ));


    if (canGoLeft) {
        distances.cells[X - 1][Y] = distanceSoFar + 1;
        canGoLeft = followNearestPipes(pipes, distances, X - 1, Y, depth+1);
    }

    if (canGoRight) {
        distances.cells[X + 1][Y] = distanceSoFar + 1;
        canGoRight = followNearestPipes(pipes, distances, X + 1, Y, depth+1);
    }

    if (canGoTop) {
        distances.cells[X][Y - 1] = distanceSoFar + 1;
        canGoTop = followNearestPipes(pipes, distances, X, Y - 1, depth+1);

    }
    if (canGoBottom) {
        distances.cells[X][Y + 1] = distanceSoFar + 1;
        canGoBottom = followNearestPipes(pipes, distances, X, Y + 1, depth+1);

    }
    console.log(`followNearestPipes(${X},${Y}, ${depth}) : ${centrePipe} : ${canGoTop?'↑':'x'} ${canGoRight?'→':'x'} ${canGoBottom?'↓':'x'} ${canGoLeft?'←':'x'}`)
    
    return canGoBottom || canGoLeft || canGoRight || canGoTop;
}

function validNeighbours(pipe: string): { left: string[], right: string[], top: string[], bottom: string[] } {
    const allDirections = ['|', '-', 'L', 'J', '7', 'F'];
    const topConnectors = ['7', '|', 'F'];
    const rightConnectors = ['J', '-', '7'];
    const bottomConnectors = ['J', '|', 'L'];
    const leftConnectors = ['L', '-', 'F'];

    switch (pipe) {
        case 'S': return {
            left: leftConnectors,
            right: rightConnectors,
            top: topConnectors,
            bottom: bottomConnectors
        }
        case '|': return {
            left: [],
            right: [],
            top: topConnectors,
            bottom: bottomConnectors
        }
        case '-': return {
            left: leftConnectors,
            right: rightConnectors,
            top: [],
            bottom: []
        }
        case 'L': return {
            left: [],
            right: rightConnectors,
            top: topConnectors,
            bottom: []
        }
        case 'J': return {
            left: leftConnectors,
            right: [],
            top: topConnectors,
            bottom: []
        }
        case '7': return {
            left: leftConnectors,
            right: [],
            top: [],
            bottom: bottomConnectors
        }
        case 'F': return {
            left: [],
            right: rightConnectors,
            top: [],
            bottom: bottomConnectors
        }
    }
    return {
        left: [],
        right: [],
        top: [],
        bottom: []
    }

}



/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    let solution = '???'
    return `${solution}`;
}