///////////////////
// BOILER PLATE  //
import { leastCommonMultiple } from "../lib/AoCMaths";

///////////////////
const day = "Day20";
export function part1(entries: string[]): string { return part1Implementation(entries); };
part1.day = day;
part1.testFile = ['test01.txt', 'test02.txt'];
part1.example = ['???', '11687500'];
part1.inputFile = 'input.txt';

export function part2(entries: string[]): string { return part2Implementation(entries); };
part2.day = day;
part2.testFile = 'test.txt';
part2.example = '???';
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
const LowPulse = false;
const HighPulse = true;

type Module = {
    id: string;
    type: string;
    destinations: string[];
    output: boolean[];
}
type Flipflop = Module & {
    isOn: boolean;
}
type Conjunction = Module & {
    inputs: Map<string, boolean>;
}
type Machine = Module | Flipflop | Conjunction;

function part1Implementation(entries: string[]) {
    let machines = new Map<string, Machine>();

    entries.forEach(entry => {
        // been desperately trying to remember how to do object destructuring assigment
        const { module, destinations } = entry.match(/(?<module>.*) -> (?<destinations>.*)/)?.groups!
        const id = ['%', '&'].includes(module.charAt(0)) ? module.substring(1) : module;

        switch (module.charAt(0)) {
            case '%': {
                machines.set(id, { id, type: 'flipflop', isOn: false, destinations: destinations.split(', '), output: [] });
                break;
            }
            case '&': {
                machines.set(id, { id, type: 'conjunction', inputs: new Map<string, boolean>(), destinations: destinations.split(', '), output: [] });
                break;
            }
            default: machines.set(id, { id, type: 'broadcaster', destinations: destinations.split(', '), output: [] })
        }
    });

    // // add the button
    // machines.set('button', { id: 'button', type: 'button', destinations: ['broadcaster'], output: [LowPulse] });

    // add the yet unknown 'rx' module
    machines.set('rx', { id: 'rx', type: 'output', destinations: [], output: [] });

    // add the test 'output' module
    machines.set('output', { id: 'output', type: 'output', destinations: [], output: [] });

    // determine the conjunction modules inputs
    machines.forEach(destination => {
        if (destination.type == 'conjunction') {
            machines.forEach(source => {
                if (source.destinations.includes(destination.id)) {
                    (<Conjunction>destination).inputs.set(source.id, LowPulse);
                }
            });
        }
    });

    const maxButtonPresses = 1000;
    let lowPulsesCount = 0;
    let highPulsesCount = 0;
    let stack = [] as Module[];
    for (let buttonPress = 1; buttonPress <= maxButtonPresses; buttonPress++) {
        stack.push({ id: 'button', type: 'button', destinations: ['broadcaster'], output: [LowPulse] });
        // process the outputs
        while (stack.length > 0) {
            const source = stack.shift()!;
            const pulse = source.output.pop()!; // get and clear output
            source.destinations.forEach(d => {
                lowPulsesCount += pulse == LowPulse ? 1 : 0;
                highPulsesCount += pulse == HighPulse ? 1 : 0;
                const destination = machines.get(d)!;
                if (destination == undefined) throw `No idea what "${d}" is!!`

                console.log(`${source.id} -${pulse == HighPulse ? 'high' : 'low'}-> ${d}${destination.type == 'flipflop' ? ((<Flipflop>destination).isOn ? '(on)' : '(off)') : ''}`);//  (stack= [${stack.map(module => module.id)}])`);
                switch (destination.type) {
                    case 'flipflop': {
                        //If a flip-flop module receives a high pulse, it is ignored
                        if (pulse == LowPulse) {
                            // if a flip-flop module receives a low pulse, it flips between on and off.
                            let flipflopDestination = destination as Flipflop;
                            const isOn = flipflopDestination.isOn;
                            flipflopDestination.isOn = !isOn;
                            // If it was off, ... sends a high pulse. If it was on,... sends a low pulse
                            flipflopDestination.output.push(isOn ? LowPulse : HighPulse);
                            stack.push(destination);
                        }
                        break;
                    }
                    case 'conjunction': {
                        let conjunctionDestination = destination as Conjunction;
                        conjunctionDestination.inputs.set(source.id, pulse);
                        // if it remembers high pulses for all inputs, it sends a low pulse; otherwise, it sends a high pulse.
                        const allInputsAreHigh = Array.from(conjunctionDestination.inputs.values()).every(i => i == HighPulse);
                        conjunctionDestination.output.push(allInputsAreHigh ? LowPulse : HighPulse);
                        stack.push(destination);
                        break;
                    }
                    case 'broadcaster': {
                        destination.output.push(pulse);
                        stack.push(destination);
                        break;
                    }
                    case 'output': {
                        break;
                    }
                    default: throw 'we should never get this far!'
                }
            });
        }
        console.log(`${('' + buttonPress).padStart(3)} : ${lowPulsesCount}/${highPulsesCount} low/high pulses`)
    }

    let solution = lowPulsesCount * highPulsesCount;
    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    let machines = new Map<string, Machine>();

    entries.forEach(entry => {
        // been desperately trying to remember how to do object destructuring assigment
        const { module, destinations } = entry.match(/(?<module>.*) -> (?<destinations>.*)/)?.groups!
        const id = ['%', '&'].includes(module.charAt(0)) ? module.substring(1) : module;

        switch (module.charAt(0)) {
            case '%': {
                machines.set(id, { id, type: 'flipflop', isOn: false, destinations: destinations.split(', '), output: [] });
                break;
            }
            case '&': {
                machines.set(id, { id, type: 'conjunction', inputs: new Map<string, boolean>(), destinations: destinations.split(', '), output: [] });
                break;
            }
            default: machines.set(id, { id, type: 'broadcaster', destinations: destinations.split(', '), output: [] })
        }
    });

    // // add the button
    // machines.set('button', { id: 'button', type: 'button', destinations: ['broadcaster'], output: [LowPulse] });

    // add the yet unknown 'rx' module
    machines.set('rx', { id: 'rx', type: 'output', destinations: [], output: [] });

    // add the test 'output' module
    //machines.set('output', { id: 'output', type: 'output', destinations: [], output: [] });

    // determine the conjunction modules inputs
    machines.forEach(destination => {
        if (destination.type == 'conjunction') {
            machines.forEach(source => {
                if (source.destinations.includes(destination.id)) {
                    (<Conjunction>destination).inputs.set(source.id, LowPulse);
                }
            });
        }
    });

    const maxButtonPresses = Number.MAX_SAFE_INTEGER;
    let lowPulsesCount = 0;
    let highPulsesCount = 0;
    let stack = [] as Module[];
    let cycles = new Map<string, { start: number, end: number | undefined }>()
    try {
        for (let buttonPress = 1; buttonPress <= maxButtonPresses; buttonPress++) {
            if (buttonPress % 1000000 == 0) console.log(`${buttonPress} button presses so far...`);
            stack.push({ id: 'button', type: 'button', destinations: ['broadcaster'], output: [LowPulse] });
            // process the outputs
            while (stack.length > 0) {
                const source = stack.shift()!;
                const pulse = source.output.pop()!; // get and clear output
                source.destinations.forEach(d => {
                    if (d == 'rx' && pulse == LowPulse) throw `******************* found rx at button press = ${buttonPress}`
                    const destination = machines.get(d)!;
                    if (destination == undefined) throw `No idea what "${d}" is!!`
                    const state = `${source.id} -${pulse == HighPulse ? 'high' : 'low'}-> ${d}`;
                    if (cycles.has(state)) {
                        if (cycles.get(state)!.end == undefined) {
                            cycles.get(state)!.end = buttonPress;
                            console.log(`Transition ${state} occurs every ${buttonPress - cycles.get(state)!.start} button presses`)
                        }
                        else {
                            // The machine turns on when a single low pulse is sent to rx.
                            // our data ends like this
                            // &cl -> rx
                            //  &js -> cl
                            // 	    &zz -> th, hr, jk, bh, js
                            //  &qs -> cl
                            // 	    &mh -> ct, qs, vs, vk, pg
                            //  &dt -> cl
                            // 	    &cm -> jp, sk, ft, dt, gb
                            //  &ts -> cl
                            // 	    &kd -> qm, ml, ts, qv, rn
                            // if we are lucky we just need to figure out what it will take for 
                            // all inputs of &cl, ie &js, &qs, &dt and &ts to send it a high pulse 
                            // so that &cl send a low pulse to rx 
                            // 
                            const clInputs = [
                                `js -high-> cl`,
                                `qs -high-> cl`,
                                `dt -high-> cl`,
                                `ts -high-> cl`]
                            if (clInputs.every(i => cycles.has(i) && cycles.get(i)!.end != undefined)) {
                                console.log(`*** rx inputs!! ***`);
                                const frequencies = [] as number[];
                                clInputs.forEach(i => {
                                    const cycle = cycles.get(i)!;
                                    frequencies.push(cycle.end! - cycle.start)
                                    console.log(`  ${i} : ${cycle.end} - ${cycle.start} = ${cycle.end! - cycle.start}`);

                                });
                                const minButtonPresses = frequencies.reduce((a, b) => leastCommonMultiple(a, b));
                                console.log(`minimum button presses = ${minButtonPresses}`);
                                // I'm afarid I don't know how to exit a foreach() cleanly :-(
                                throw `${minButtonPresses}`;
                            }
                        }
                    } else {
                        cycles.set(state, { start: buttonPress, end: undefined });
                    }
                    //console.log(`${source.id} -${pulse == HighPulse ? 'high' : 'low'}-> ${d}${destination.type=='flipflop'?((<Flipflop>destination).isOn?'(on)':'(off)'):''}`);//  (stack= [${stack.map(module => module.id)}])`);
                    switch (destination.type) {
                        case 'flipflop': {
                            //If a flip-flop module receives a high pulse, it is ignored
                            if (pulse == LowPulse) {
                                // if a flip-flop module receives a low pulse, it flips between on and off.
                                let flipflopDestination = destination as Flipflop;
                                const isOn = flipflopDestination.isOn;
                                flipflopDestination.isOn = !isOn;
                                // If it was off, ... sends a high pulse. If it was on,... sends a low pulse
                                flipflopDestination.output.push(isOn ? LowPulse : HighPulse);
                                stack.push(destination);
                            }
                            break;
                        }
                        case 'conjunction': {
                            let conjunctionDestination = destination as Conjunction;
                            conjunctionDestination.inputs.set(source.id, pulse);
                            // if it remembers high pulses for all inputs, it sends a low pulse; otherwise, it sends a high pulse.
                            const allInputsAreHigh = Array.from(conjunctionDestination.inputs.values()).every(i => i == HighPulse);
                            conjunctionDestination.output.push(allInputsAreHigh ? LowPulse : HighPulse);
                            stack.push(destination);
                            break;
                        }
                        case 'broadcaster': {
                            destination.output.push(pulse);
                            stack.push(destination);
                            break;
                        }
                        case 'output': {
                            break;
                        }
                        default: throw 'we should never get this far!'
                    }
                });
            }
            //console.log(`${('' + buttonPress).padStart(3)} : ${lowPulsesCount}/${highPulsesCount} low/high pulses`)
        }
    }
    catch (solution) {
        return <string>solution;
    }

    let solution = 'No idea mates, soz!';
    return `${solution}`;
}