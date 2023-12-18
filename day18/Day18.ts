///////////////////
// BOILER PLATE  //

import { Grid } from "../lib/Grid";

///////////////////
const day = "Day18";
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
    const mapSize = 1000;
    const map = new Grid<boolean>(mapSize, mapSize, false);

    let x = mapSize / 2;
    let y = mapSize / 2;


    entries.forEach(entry => {
        const g = /(?<direction>.) (?<distance>\d*) (?<colour>.*)/.exec(entry)?.groups!
        const direction = g.direction;
        const distance = parseInt(g.distance);

        for (let i = 0; i < distance; i++) {
            switch (direction) {
                case 'U': y--; break;
                case 'D': y++; break;
                case 'L': x--; break;
                case 'R': x++; break;
            }

            map.setCell(x, y, true);
        }
    });

    map.logToConsole(c => c ? '#' : '.');

    // ray tracing copied from day 10
    const map2 = new Grid<boolean>(mapSize, mapSize, false);
    let total = 0;

    for (let Y = 0; Y <= map.maxY; Y++) {
        for (let X = 0; X <= map.maxX; X++) {
            // cast a ray from the left handside edge (which we inserted so know is outside)
            //  up to this cell
            // ignore horizontal sections of pipe:
            //  if I hit a vertical pipe in -> out and out -> in
            //  if I hit a U bend I remain in or out
            //  If I hit a Z bend in -> out and out -> in
            let inside = false;
            let sectionStartedWithF = false;
            let sectionStartedWithL = false
            for (let x = 0; x <= X; x++) {
                if (map.getCell(x, Y)) {// its a trench 

                    if (map.getCell(x, Y - 1) && map.getCell(x, Y + 1)) {
                        // vertical section
                        inside = !inside;
                    }

                    if (map.getCell(x, Y + 1) && map.getCell(x + 1, Y)) {
                        // ┍ corner (F)
                        sectionStartedWithF = true;
                    }
                    if (map.getCell(x, Y - 1) && map.getCell(x + 1, Y)) {
                        // ┖ corner (L)
                        sectionStartedWithL = true;
                    }

                    if (map.getCell(x - 1, Y) && map.getCell(x, Y - 1)) {
                        // ┚ corner (J)
                        if (sectionStartedWithL) {
                            // U bend (┖┚) 
                            sectionStartedWithL = false;
                        }
                        if (sectionStartedWithF) {
                            // Z bend (┍┚) counts 
                            inside = !inside;
                            sectionStartedWithF = false;
                        }
                    }

                    if (map.getCell(x - 1, Y) && map.getCell(x, Y + 1)) {
                        // ┒ corner (7)
                        if (sectionStartedWithF) {
                            // U bend (┍┑) 
                            sectionStartedWithF = false;
                        }
                        if (sectionStartedWithL) {
                            // Z bend (┖┒) 
                            inside = !inside;
                            sectionStartedWithL = false;
                        }
                    }

                }
            }


            map2.setCell(X, Y, inside || map.getCell(X, Y)!);
            
            total += (inside || map.getCell(X, Y)) ? 1 : 0;
        }
    }

    map2.logToConsole(c => c ? '#' : '.');

    return `${total}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////

function part2Implementation(entries: string[]) {
    
    const mapSize = 100000;
    const map = new Grid<boolean>(mapSize, mapSize, false);

    let x = mapSize / 2;
    let y = mapSize / 2;


    entries.forEach(entry => {
        const g = /#(?<distance>.{5})(?<direction>\d)/.exec(entry)?.groups!

        const direction = g.direction;
        const distance = parseInt(g.distance, 16);

        for (let i = 0; i < distance; i++) {
            switch (direction) {
                case '3': y--; break;
                case '1': y++; break;
                case '2': x--; break;
                case '0': x++; break;
            }

            map.setCell(x, y, true);
        }
    });

    //map.logToConsole(c => c ? '#' : '.');

    // ray tracing copied from day 10
    const map2 = new Grid<boolean>(mapSize, mapSize, false);
    let total = 0;

    for (let Y = 0; Y <= map.maxY; Y++) {
        for (let X = 0; X <= map.maxX; X++) {
            // cast a ray from the left handside edge (which we inserted so know is outside)
            //  up to this cell
            // ignore horizontal sections of pipe:
            //  if I hit a vertical pipe in -> out and out -> in
            //  if I hit a U bend I remain in or out
            //  If I hit a Z bend in -> out and out -> in
            let inside = false;
            let sectionStartedWithF = false;
            let sectionStartedWithL = false
            for (let x = 0; x <= X; x++) {
                if (map.getCell(x, Y)) {// its a trench 

                    if (map.getCell(x, Y - 1) && map.getCell(x, Y + 1)) {
                        // vertical section
                        inside = !inside;
                    }

                    if (map.getCell(x, Y + 1) && map.getCell(x + 1, Y)) {
                        // ┍ corner (F)
                        sectionStartedWithF = true;
                    }
                    if (map.getCell(x, Y - 1) && map.getCell(x + 1, Y)) {
                        // ┖ corner (L)
                        sectionStartedWithL = true;
                    }

                    if (map.getCell(x - 1, Y) && map.getCell(x, Y - 1)) {
                        // ┚ corner (J)
                        if (sectionStartedWithL) {
                            // U bend (┖┚) 
                            sectionStartedWithL = false;
                        }
                        if (sectionStartedWithF) {
                            // Z bend (┍┚) counts 
                            inside = !inside;
                            sectionStartedWithF = false;
                        }
                    }

                    if (map.getCell(x - 1, Y) && map.getCell(x, Y + 1)) {
                        // ┒ corner (7)
                        if (sectionStartedWithF) {
                            // U bend (┍┑) 
                            sectionStartedWithF = false;
                        }
                        if (sectionStartedWithL) {
                            // Z bend (┖┒) 
                            inside = !inside;
                            sectionStartedWithL = false;
                        }
                    }

                }
            }


            //map2.setCell(X, Y, inside || map.getCell(X, Y)!);
            
            total += (inside || map.getCell(X, Y)) ? 1 : 0;
        }
    }

    map2.logToConsole(c => c ? '#' : '.');

    return `${total}`;
}