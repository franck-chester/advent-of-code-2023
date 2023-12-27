///////////////////
// BOILER PLATE  //

import { Cube } from "../lib/Cube";

///////////////////
const day = "Day22";
export function part1(entries: string[], isTest?: boolean, testNumber?: number): string { return part1Implementation(entries, isTest, testNumber); };
part1.day = day;
part1.testFile = 'test.txt';    // ['test01.txt'];
part1.example = '???';          // ['???'];
part1.inputFile = 'input.txt';

export function part2(entries: string[], isTest?: boolean, testNumber?: number): string { return part2Implementation(entries, isTest, testNumber); };
part2.day = day;
part2.testFile = 'test.txt';    // ['test01.txt'];
part2.example = '???';          // ['???'];
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
type Coordinate = {
    x: number,
    y: number,
    z: number
}
class Brick {
    id: string;
    start: Coordinate;
    end: Coordinate;
    constructor(id: string, start: Coordinate, end: Coordinate) {
        this.id = id;
        this.start = start;
        this.end = end;
    }

    get left() {
        return this.start.x;
    }
    get right() {
        return this.end.x;
    }
    get front() {
        return this.start.y;
    }
    get back() {
        return this.end.y;
    }
    get top() {
        return this.end.z;
    }

    get bottom() {
        return this.start.z;
    }
}

class NotABrick {

}

function part1Implementation(entries: string[], isTest?: boolean, testNumber?: number) {
    const X1 = new Array<number>();
    const X2 = new Array<number>();
    const Y1 = new Array<number>();
    const Y2 = new Array<number>();
    const Z1 = new Array<number>();
    const Z2 = new Array<number>();

    entries.forEach(entry => {
        const { x1, y1, z1, x2, y2, z2 } = entry.match(/(?<x1>\d+),(?<y1>\d+),(?<z1>\d+)~(?<x2>\d+),(?<y2>\d+),(?<z2>\d+)/)!.groups!
        X1.push(parseInt(x1));
        X2.push(parseInt(x2));
        Y1.push(parseInt(y1));
        Y2.push(parseInt(y2));
        Z1.push(parseInt(z1));
        Z2.push(parseInt(z2));
    });

    const maxX = Math.max(Math.max(...X1), Math.max(...X2));
    const maxY = Math.max(Math.max(...Y1), Math.max(...Y2));
    const maxZ = Math.max(Math.max(...Z1), Math.max(...Z2));

    console.log(`Building a 3D volume ${maxX + 1} x ${maxY + 1} x ${maxZ + 1}...`)
    const snapshot = new Cube<Brick | NotABrick>(maxX + 1, maxY + 1, maxZ + 1, (c) => { return {} as NotABrick });

    for (let i = 0; i < entries.length; i++) {
        const brick = new Brick(
            isTest ? String.fromCharCode(65 + i) : i.toString(32),
            {
                x: X1[i],
                y: Y1[i],
                z: Z1[i]
            },
            {
                x: X2[i],
                y: Y2[i],
                z: Z2[i]
            });

        console.log(`marking brick '${brick.id}' from (${brick.start.x},${brick.start.y},${brick.start.z}) to (${brick.end.x},${brick.end.y},${brick.end.z})`)
        for (let x = brick.start.x; x <= brick.end.x; x++) {
            for (let y = brick.start.y; y <= brick.end.y; y++) {
                for (let z = brick.start.z; z <= brick.end.z; z++) {
                    snapshot.setCell(x, y, z, brick);
                }
            }
        }

    }

    snapshot.logToConsole('Y', 0, (c) => c instanceof Brick ? (<Brick>c).id : '.');
    snapshot.logToConsole('Y', 1, (c) => c instanceof Brick ? (<Brick>c).id : '.');
    snapshot.logToConsole('Y', 2, (c) => c instanceof Brick ? (<Brick>c).id : '.');

    snapshot.logToConsole('X', 0, (c) => c instanceof Brick ? (<Brick>c).id : '.');
    snapshot.logToConsole('X', 1, (c) => c instanceof Brick ? (<Brick>c).id : '.');
    snapshot.logToConsole('X', 2, (c) => c instanceof Brick ? (<Brick>c).id : '.');

    // let bricks settle down


    let solution = '???'
    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[], isTest?: boolean, testNumber?: number) {
    let solution = '???'
    return `${solution}`;
}