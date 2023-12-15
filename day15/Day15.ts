///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day15";
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
export function hash(string: string): string {
    return string.split('').reduce((previous, current, index) => `${((parseInt(previous) + current.charCodeAt(0)) * 17) % 256}`, "0");
}
function part1Implementation(entries: string[]) {
    let solution = 0;
    entries.flatMap(entry => entry.split(',')).forEach(e => solution += parseInt(hash(e)));
    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    const boxes = [] as Box[];
    for (let b = 0; b < 256; b++) boxes.push(new Map<string, { position: number; focal: string; }>());
    entries.flatMap(entry => entry.split(',')).forEach((e, b) => {
        applyInstruction(e, boxes);
    });

    let focussingPower = 0;
    boxes.forEach((box, index) => {

        Array.from(box.entries()).forEach(A => {
            const label = A[0];
            const b = A[1];
            const lensePower = (index +1) * (b.position +1) * parseInt(b.focal)
            console.log(`${label} : ${(index +1)}(Box ${index}) * ${b.position +1} (slot ${b.position}) * ${b.focal} (focal length) = ${lensePower}`);
            focussingPower += lensePower
        });
    });

    return `${focussingPower}`;
}

export type Box = Map<string, { position: number; focal: string; }>;
export function applyInstruction(e: string, boxes: Box[]): Box {
    const m = e.match(/(?<label>.*)(?<operation>[=|\-])(?<focal>\d)?/);
    const label = m!.groups!.label;
    const operation = m!.groups!.operation;
    const focal = operation === '=' ? m!.groups!.focal : '';
    const boxId = parseInt(hash(label))
    const box = boxes[boxId];
    if (operation === '=') {
        if (box.has(label)) {
            // If there is already a lens in the box with the same label, 
            // replace the old lens with the new lens: remove the old lens 
            // and put the new lens in its place, not moving any other lenses in the box.
            box.set(label, { position: box.get(label)!.position, focal });
        } else {
            // If there is not already a lens in the box with the same label, 
            // add the lens to the box immediately behind any lenses already in the box. 
            // Don't move any of the other lenses when you do this. If there aren't any lenses in the box, 
            // the new lens goes all the way to the front of the box.
            box.set(label, { position: box.size, focal });
        }
    } else {
        if(box.has(label)){
            const emptiedPosition = box.get(label)!.position;
            box.delete(label);
            Array.from(box.keys()).forEach(k => {
                if(box.get(k)!.position > emptiedPosition){
                    box.set(k, {position : box.get(k)!.position-1, focal : box.get(k)!.focal});
                }
            });
        }
    }
    return box;
}
