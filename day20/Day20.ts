///////////////////
// BOILER PLATE  //

import { machine } from "os";

///////////////////
const day = "Day20";
export function part1(entries: string[]): string { return part1Implementation(entries); };
part1.day = day;
part1.testFile = ['test01.txt', 'test02.txt'];
part1.example = ['???', '???'];
part1.inputFile = 'input.txt';

export function part2(entries: string[]): string { return part2Implementation(entries); };
part2.day = day;
part2.testFile = 'test.txt';
part2.example = '???';
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
type Module = {
    id: string;
    type: string;
    destinations: string[];
    outputs: boolean[];
}
type Flipflop = Module & {
    isOn: boolean;
}
type Conjunction = Module & {
    inputs: boolean[];
    inputsCount: number;
}
type Machine = Module | Flipflop | Conjunction;

const LowPulse = false;
const HighPulse = true;

function part1Implementation(entries: string[]) {
    let machines = new Map<string, Machine>();

    entries.forEach(entry => {
        // been desperately trying to remember how to do object destructuring assigment
        const { module, destinations } = entry.match(/(?<module>.*) -> (?<destinations>.*)/)?.groups!
        const id = ['%', '&'].includes(module.charAt(0)) ? module.substring(1) : module;

        switch (module.charAt(0)) {
            case '%': {
                machines.set(id, { id, type: 'flipflop', isOn: false, destinations: destinations.split(', '), outputs: [] });
                break;
            }
            case '&': {
                machines.set(id, { id, type: 'conjunction', inputs: [], inputsCount: 0, destinations: destinations.split(', '), outputs: [] });
                break;
            }
            default: machines.set(id, { id, type: 'broadcaster', destinations: destinations.split(', '), outputs: [] })
        }
    });

    // add the button
    machines.set('button', { id: 'button', type: 'button', destinations: ['broadcaster'], outputs: [LowPulse] });

    // add the test 'output' module
    machines.set('output', { id: 'output', type: 'output', destinations: [], outputs: [] });

    // determine the conjunction modules inputs
    machines.forEach(destination => {
        if (destination.type == 'conjunction') {
            const sources = new Set<string>();
            machines.forEach(source => {
                if (source.destinations.includes(destination.id)) {
                    sources.add(source.id);
                }
            });
            // initialise the input array to the number of sources
            (<Conjunction>destination).inputsCount = sources.size;
        }
    });

    const maxButtonPresses = 1;
    let lowPulsesCount = 0;
    let highPulsesCount = 0;
    let stack = [] as Module[];
    for (let buttonPress = 0; buttonPress < maxButtonPresses; buttonPress++) {

        // process the outputs
        let hasProcessedAtLeastOneOutput = false;
        do {
            hasProcessedAtLeastOneOutput = false;
            machines.forEach(source => {
                const output = source.outputs.pop();
                if (output != undefined) {
                    hasProcessedAtLeastOneOutput = true;
                    source.destinations.forEach(d => {
                        console.log(`${source.id} -${output == HighPulse ? 'high' : 'low'}-> ${d}`);
                        lowPulsesCount += output == LowPulse ? 1 : 0;
                        highPulsesCount += output == HighPulse ? 1 : 0;
                        const destination = machines.get(d)!;
                        if (destination == undefined) throw `No idea what "${d}" is!!`
                        switch (destination.type) {
                            case 'flipflop': {
                                //If a flip-flop module receives a high pulse, it is ignored
                                if (output == HighPulse) {
                                    break;
                                }
                                // if a flip-flop module receives a low pulse, it flips between on and off.
                                let flipflopDestination = destination as Flipflop;
                                const isOn = flipflopDestination.isOn;
                                flipflopDestination.isOn = !isOn;
                                // If it was off, ... sends a high pulse. If it was on,... sends a low pulse
                                flipflopDestination.outputs.push(isOn ? LowPulse : HighPulse);

                                break;
                            }
                            case 'conjunction': {
                                let conjunctionDestination = destination as Conjunction;
                                conjunctionDestination.inputs.push(output);
                                if (conjunctionDestination.inputs.length == conjunctionDestination.inputsCount) {
                                    // if it remembers high pulses for all inputs, it sends a low pulse; otherwise, it sends a high pulse.
                                    const allInputsAreHigh = conjunctionDestination.inputs.every(i => i == HighPulse);
                                    conjunctionDestination.outputs.push(allInputsAreHigh ? LowPulse : HighPulse);

                                    // clear the inputs
                                    conjunctionDestination.inputs = [];
                                }
                                break;
                            }
                            case 'broadcaster': {
                                destination.outputs.push(output);

                                break;
                            }
                            case 'output': {
                                break;
                            }
                            default: throw 'we should never get this far!'
                        }
                    });
                }
            });
        } while (hasProcessedAtLeastOneOutput);
        console.log(`${('' + buttonPress).padStart(3)} : ${lowPulsesCount}/${highPulsesCount} low/high pulses`)

    }

    let solution = '???'
    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    let solution = '???'
    return `${solution}`;
}