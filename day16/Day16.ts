///////////////////
// BOILER PLATE  //

import { Grid } from "../lib/Grid";

///////////////////
const day = "Day16";
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

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
function part1Implementation(entries: string[]) {
    const grid = Grid.fromEntries(entries, c => c);
    const energyLevels = Grid.fromEntries(entries, c => 0);
    const tails = [{ x: 0, y: 0, direction: 0 }];  // 0 is left to right, 1 top to bottom, 2, right to left, 3, bottom to top
    let steps = 0;
    do {
        if(steps % 100)console.log(`${steps} : TAILS : ${JSON.stringify(tails)}`);
        const walls = [] as number[]; // index of tails to remove
        for (let i = 0; i < tails.length; i++) {
            
            const tail = tails[i];
            if (tail.x < 0 || tail.x > grid.maxX || tail.y < 0 || tail.y > grid.maxY) {
                //console.log(`${steps} :   hit wall at ${JSON.stringify(tail)} - removing tail[${i}] : `)
                tails.splice(i, 1);
                continue;
            }
            //console.log(`${steps} : -- TAILS[${i}] : ${JSON.stringify(tail)}`);
            const cell = grid.getCell(tail.x, tail.y)!;

            //console.log(`${steps} : -- TAILS[${i}] : ${JSON.stringify(tail)} : cell : ${cell}`);
            energyLevels.setCell(tail.x, tail.y, energyLevels.getCell(tail.x, tail.y)! + 1);

            switch (cell) {
                case '.': {
                    switch (tail.direction) { // 0 is left to right, 1 top to bottom, 2 right to left, 3 bottom to top
                        case 0: {
                            goRight(tail);
                            break;
                        }
                        case 1: {
                            goDown(tail);
                            break;
                        }
                        case 2: {
                            goLeft(tail);
                            break;
                        }
                        case 3: {
                            goUp(tail);
                            break;
                        }
                    }
                    break;
                }
                case '/': {
                    switch (tail.direction) { // 0 is left to right, 1 top to bottom, 2 right to left, 3 bottom to top
                        case 0: {
                            goUp(tail);
                            break;
                        }
                        case 1: {
                            goLeft(tail);
                            break;
                        }
                        case 2: {
                            goDown(tail);
                            break;
                        }
                        case 3: {
                            goRight(tail);
                            break;
                        }
                    }
                    break;
                }
                case '\\': {
                    switch (tail.direction) { // 0 is left to right, 1 top to bottom, 2 right to left, 3 bottom to top
                        case 0: {
                            goDown(tail);
                            break;
                        }
                        case 1: {
                            goRight(tail);
                            break;
                        }
                        case 2: {
                            goUp(tail);
                            break;
                        }
                        case 3: {
                            goLeft(tail);
                            break;
                        }
                    }
                    break;
                }
                case '-': {
                    switch (tail.direction) { // 0 is left to right, 1 top to bottom, 2 right to left, 3 bottom to top
                        case 0: {
                            goRight(tail);
                            break;
                        }
                        case 2: {
                            goLeft(tail);
                            break;
                        }
                        case 1:
                        case 3: {
                            // split the beam
                            const splitLocation = { x: tail.x, y: tail.y, direction: tail.direction };
                            tails.push(splitLocation);

                            goRight(tail);
                            goLeft(splitLocation);
                            break;
                        }
                    }
                    break;
                }
                case '|': {
                    switch (tail.direction) { // 0 is left to right, 1 top to bottom, 2 right to left, 3 bottom to top
                        case 1: {
                            goDown(tail);
                            break;
                        }
                        case 3: {
                            goUp(tail);
                            break;
                        }
                        case 0:
                        case 2: {
                            // split the beam
                            const splitLocation = { x: tail.x, y: tail.y, direction: tail.direction };
                            tails.push(splitLocation);

                            goDown(tail);
                            goUp(splitLocation);
                            break;
                        }
                    }
                    break;
                }
            }
        }

        for (let j = tails.length - 1; j >= 0; j--) {
            let tail = tails[j];
            if (tail.x < 0 || tail.x > grid.maxX || tail.y < 0 || tail.y > grid.maxY) {
                //console.log(`${steps} :   hit wall at ${JSON.stringify(tail)} - removing tail[${j}] : `)
                tails.splice(j, 1);
            } else {
                let energy = energyLevels.getCell(tail.x, tail.y)!;
                if (energy >1000) {
                    // console.log(`${steps} :   spike at ${JSON.stringify(tail)} - removing tail[${j}] : `)
                    tails.splice(j, 1);
                }
            }
        }

        steps++;
    } while (tails.length > 0);


    energyLevels.logToConsole(e => e! > 0 ? '#' : '.');
    let energised = 0;
    for(let x=0; x< energyLevels.width; x++){
        for(let y=0; y<energyLevels.height; y++){
            energised += energyLevels.getCell(x, y)! > 0 ? 1: 0;
        }
    }

    
    return `${energised}`;

    function goUp(currentLocation: { x: number; y: number; direction: number; }) {
        currentLocation.y--;
        currentLocation.direction = 3; // 0 is left to right, 1 top to bottom, 2 right to left, 3 bottom to top
    }

    function goLeft(currentLocation: { x: number; y: number; direction: number; }) {
        currentLocation.x--;
        currentLocation.direction = 2; // 0 is left to right, 1 top to bottom, 2 right to left, 3 bottom to top
    }

    function goDown(currentLocation: { x: number; y: number; direction: number; }) {
        currentLocation.y++;
        currentLocation.direction = 1; // 0 is left to right, 1 top to bottom, 2 right to left, 3 bottom to top
    }

    function goRight(currentLocation: { x: number; y: number; direction: number; }) {
        currentLocation.x++;
        currentLocation.direction = 0; // 0 is left to right, 1 top to bottom, 2 right to left, 3 bottom to top
    }
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    let solution = '???'
    return `${solution}`;
}