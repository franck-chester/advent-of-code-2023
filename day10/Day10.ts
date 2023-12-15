///////////////////
// BOILER PLATE  //

import { count } from "console";
import { Grid } from "../lib/Grid";

///////////////////
const day = "Day10";
export function part1(entries: string[]): string { return part1Implementation(entries); };
part1.day = day;
part1.testFile = ['test01.txt', 'test02.txt', 'test03.txt'];
part1.example = ['4', '8'];
part1.inputFile = 'input.txt';

export function part2(entries: string[]): string { return part2Implementation(entries); };
part2.day = day;
part2.testFile = ['test04.txt', 'test05.txt', 'test06.txt'];
part2.example = ['4', '8', '10'];
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
const topConnectors = ['7', '|', 'F'];
const rightConnectors = ['J', '-', '7'];
const bottomConnectors = ['J', '|', 'L'];
const leftConnectors = ['L', '-', 'F'];

function part1Implementation(entries: string[]) {
    const pipes = Grid.fromEntries<string>(entries, (s) => s);
    pipes.logToConsole((c) => c !== undefined ? c : '.');
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
    distances.setCell(x, y, 0);

    // from the start, measure the distance
    followNearestPipes(pipes, distances, x, y);

    distances.logToConsole((c) => c !== undefined ? `${c}` : 'x');
    let pathLength = 0;

    for (x = 0; x <= pipes.maxX; x++) {
        for (y = 0; y <= pipes.maxY; y++) {
            const distance = distances.cells[x][y];
            if (distance && distance > pathLength) pathLength = distance;
        }
    }
    // close the path
    pathLength++;
    return `${pathLength / 2}`;
}

export function followNearestPipes(pipes: Grid<string>, distances: Grid<number>, XStart: number, YStart: number) {
    let X = XStart;
    let Y = YStart;
    while (true) {
        //console.log(`followNearestPipes(X: ${X}, Y: ${Y})...`)
        const centrePipe = pipes.cells[X][Y]!;
        const distanceSoFar = distances.cells[X][Y] ? distances.cells[X][Y]! : 0;
        const valid = validNeighbours(centrePipe);
        const cellOnLeft = X > 0 ? pipes.cells[X - 1][Y] : undefined;
        const cellOnRight = X < pipes.maxX ? pipes.cells[X + 1][Y] : undefined;
        const cellOnTop = Y > 0 ? pipes.cells[X][Y - 1] : undefined;
        const cellOnBottom = Y < pipes.maxY ? pipes.cells[X][Y + 1] : undefined;

        const distanceOnTheLeft = X > 0 ? distances.cells[X - 1][Y] : -1;
        let canGoLeft = cellOnLeft !== undefined && (valid.left.includes(cellOnLeft) && (distanceOnTheLeft === undefined || distanceOnTheLeft! > distanceSoFar + 1));
        const distanceOnTheRight = X < pipes.maxX ? distances.cells[X + 1][Y] : -1;
        let canGoRight = cellOnRight !== undefined && (valid.right.includes(cellOnRight) && (distanceOnTheRight === undefined || distanceOnTheRight! > distanceSoFar + 1));
        const distanceOnTheTop = Y > 0 ? distances.cells[X][Y - 1] : -1;
        let canGoTop = cellOnTop !== undefined && (valid.top.includes(cellOnTop) && (distanceOnTheTop === undefined || distanceOnTheTop! > distanceSoFar + 1));
        const distanceOnTheBottom = Y < pipes.maxY ? distances.cells[X][Y + 1] : -1;
        let canGoBottom = cellOnBottom !== undefined && (valid.bottom.includes(cellOnBottom) && (distanceOnTheBottom === undefined || distanceOnTheBottom! > distanceSoFar + 1));

        //console.log(`followNearestPipes(${X},${Y}) : ${centrePipe} : ${canGoTop ? '↑' : 'x'} ${canGoRight ? '→' : 'x'} ${canGoBottom ? '↓' : 'x'} ${canGoLeft ? '←' : 'x'}`)

        if (canGoLeft) {
            distances.cells[X - 1][Y] = distanceSoFar + 1;
            X = X - 1;
            continue;
        }

        if (canGoRight) {
            distances.cells[X + 1][Y] = distanceSoFar + 1;
            X = X + 1;
            continue
        }

        if (canGoTop) {
            distances.cells[X][Y - 1] = distanceSoFar + 1;
            Y = Y - 1;
            continue
        }
        if (canGoBottom) {
            distances.cells[X][Y + 1] = distanceSoFar + 1;
            Y = Y + 1;
            continue;
        }

        // if we got this far, we've reached the end
        break;
    }
}

function validNeighbours(pipe: string): { left: string[], right: string[], top: string[], bottom: string[] } {


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
    const maSteps = 6951; // part 1 solution
    const pipes = Grid.fromEntries<string>(entries, (s) => s);
    // insert a blank edged on the left hand side to simplify ray tracing
    pipes.insertEmptyColumnAt(0, '.');


    pipes.logToConsole((c) => c !== undefined ? c : '.');
    console.log('----------------------------')
    const visited = new Grid<boolean>(pipes.maxX + 1, pipes.maxY + 1);

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

    // from the start, follow the path
    followNearestPipes2(pipes, visited, x, y, []);

    visited.logToConsole((c) => c !== undefined ? (c ? 'x' : '.') : '.');
    let insideCount = 0;

    for (let X = 0; X <= pipes.maxX; X++) {
        for (let Y = 0; Y <= pipes.maxY; Y++) {
            let v = visited.cells[X][Y];
            if (v !== undefined && v == true) continue; // its a pipe, neither in or out
            // cast a ray from the left handside edge (which we inserted so know is outside)
            //  up to this cell
            // ignore horizontal sections of pipe:
            //  if I hit a vertical pipe in -> out and out -> in
            //  if I hit a U bend I remain in or out
            //  If I hit a Z bend in -> out and out -> in
            let out = true;
            let sectionStartedWithF = false;
            let sectionStartedWithL = false
            for (let x = 0; x <= X; x++) {
                v = visited.cells[x][Y];
                if (v !== undefined && v == true) {// its a pipe 
                    let p = pipes.cells[x][Y]!;

                    if ('|' == p) {
                        out = !out;
                    }
                    if ('F' == p) sectionStartedWithF = true;
                    if ('L' == p) sectionStartedWithL = true;
                    if ('J' == p) {
                        if (sectionStartedWithL) {
                            // U bend (┖┚) 
                            sectionStartedWithL = false;
                        }
                        if (sectionStartedWithF) {
                            // Z bend (┍┚) counts 
                            out = !out;
                            sectionStartedWithF = false;
                        }
                    }

                    if ('7' == p) {
                        if (sectionStartedWithF) {
                            // U bend (┍┑) 
                            sectionStartedWithF = false;
                        }
                        if (sectionStartedWithL) {
                            // Z bend (┖┒) 
                            out = !out;
                            sectionStartedWithL = false;
                        }
                    }
                }
            }


            pipes.setCell(X, Y, out ? 'O' : 'I');
            insideCount += out ? 0 : 1;
        }
    }
    pipes.logToConsole((c) => c !== undefined ? c : '.');


    return `${insideCount}`;
}

export function followNearestPipes2(pipes: Grid<string>, visited: Grid<boolean>, XStart: number, YStart: number, path: { x: number, y: number }[]) {
    let X = XStart;
    let Y = YStart;
    while (true) {
        //console.log(`followNearestPipes2(X: ${X}, Y: ${Y}, )...`)
        visited.setCell(X, Y, true);

        const centrePipe = pipes.cells[X][Y]!;

        const valid = validNeighbours(centrePipe);
        const cellOnLeft = X > 0 ? pipes.cells[X - 1][Y] : undefined;
        const cellOnRight = X < pipes.maxX ? pipes.cells[X + 1][Y] : undefined;
        const cellOnTop = Y > 0 ? pipes.cells[X][Y - 1] : undefined;
        const cellOnBottom = Y < pipes.maxY ? pipes.cells[X][Y + 1] : undefined;

        let canGoLeft = cellOnLeft !== undefined && (valid.left.includes(cellOnLeft) && visited.cells[X - 1][Y] != true);
        let canGoRight = cellOnRight !== undefined && (valid.right.includes(cellOnRight) && visited.cells[X + 1][Y] != true);
        let canGoTop = cellOnTop !== undefined && (valid.top.includes(cellOnTop) && visited.cells[X][Y - 1] != true);
        let canGoBottom = cellOnBottom !== undefined && (valid.bottom.includes(cellOnBottom) && visited.cells[X][Y + 1] != true);


        if ('S' == centrePipe) {
            // translate it to save us hassle when ray tracing
            if (canGoLeft && canGoRight) pipes.setCell(X, Y, '-');
            if (canGoTop && canGoBottom) pipes.setCell(X, Y, '|');
                                                                        //  |
            if (canGoLeft && canGoTop) pipes.setCell(X, Y, 'J');        // -S = ┙
            if (canGoLeft && canGoBottom) pipes.setCell(X, Y, '7');     // -S = ┒
                                                                        //  |
            if (canGoRight && canGoTop) pipes.setCell(X, Y, 'L');       //  S-= ┗
            if (canGoRight && canGoBottom) pipes.setCell(X, Y, 'F');    //  S-= ┍
                                                                        //  | 
        }

        if (canGoLeft) {
            X = X - 1;
            continue;
        }

        if (canGoRight) {
            X = X + 1;
            continue;
        }

        if (canGoTop) {
            Y = Y - 1;
            continue;

        }
        if (canGoBottom) {
            Y = Y + 1;
            continue;
        }
        //console.log(`followNearestPipes2(${X},${Y}) : ${centrePipe} : ${canGoTop?'↑':'x'} ${canGoRight?'→':'x'} ${canGoBottom?'↓':'x'} ${canGoLeft?'←':'x'}`)
        break;
    }
}


