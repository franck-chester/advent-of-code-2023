import { Day } from "../lib/Day";

export interface range {
    start: number,
    end: number
}
export interface Mapper {
    source: string,
    destination: string,
    sourceRanges: range[],
    destinationRanges: range[]

}


export function parseEmptyMap(entry: string): Mapper | undefined {
    let m = entry.match(/(?<source>.*)-to-(?<destination>.*) map:/);
    if (m) {
        return {
            source: m.groups!.source,
            destination: m.groups!.destination,
            sourceRanges: [],
            destinationRanges: []
        }
    }
    return undefined;
}

export function parseRangesAndAddToMap(entry: string, map: Mapper): Mapper | undefined {
    console.log(`    parseRangesAndAddToMap(${entry}, ${JSON.stringify(map)})...`)
    let m = entry.match(/(?<destinationStart>\d*) (?<sourceStart>.*) (?<length>.*)/);
    if (m) {
        const length = parseInt(m.groups!.length);
        const sourceStart = parseInt(m.groups!.sourceStart);
        const destinationStart = parseInt(m.groups!.destinationStart);
        map.sourceRanges.push({
            start: sourceStart,
            end: sourceStart + length - 1

        });
        map.destinationRanges.push({
            start: destinationStart,
            end: destinationStart + length - 1
        });
        return map;
    }
    return undefined;
}

export function parseMaps(entries: string[]) : Map<string, Mapper> {
    console.log(`parseMaps()...`)
    const maps = new Map<string, Mapper>();

    for (let i = 2; i < entries.length; i++) {
        console.log(` ...entry = ${entries[i]}, line = ${i}`);
        let map = parseEmptyMap(entries[i]);
        if (map) {
            maps.set(map.source, map);
            while (i++ < entries.length) {
                if(!entries[i] || entries[i].length == 0) break;
                console.log(` ...entry = '${entries[i]}', line = ${i}`);
                parseRangesAndAddToMap(entries[i], map);
            }
        }
    }
    console.log(`parseMaps() : ${JSON.stringify(maps,null, ' ')}`)
    return maps;
}


export function mapping(start: number, map: Mapper): number {
    // find source range 
    console.log(`  mapping(${start}, ${JSON.stringify(map)})...`)
    if(!map) throw `Undefined Map!`;
    const index = map.sourceRanges.findIndex(r => r.start <= start && start <= r.end);
    if (index > -1) {
        const sourceRange = map.sourceRanges[index];
        const destinationRange = map.destinationRanges[index];
        return start + (destinationRange.start - sourceRange.start)
    }
    return start;
}
export function walkThroughMaps(seed : number, maps:Map<string, Mapper> ) : number {
    let step = 'seed';
    let location = seed;
    do{
        console.log(`walkThroughMaps(${seed}, ...) : location = ${location}, step = ${step}...`)
        let map = maps.get(step)!;
        if(!map) throw `No map for step '${step}'!`;
        location = mapping(location,map);
        step = map.destination;
    }while(step != 'location')
    console.log(`walkThroughMaps(${seed}) => ${location}`);
    return location;
}

export class Day05 extends Day {
    testFilePart1() { return 'test.txt' };
    testFilePart2() { return 'test.txt' };
    part1Example(): string {
        return "35"
    }
    part2Example(): string {
        return "???"
    }


    part1(entries: string[]): string {
        let seeds = entries[0].match(/seeds: (?<seeds>.*)/)!.groups!.seeds.split(' ');
        let maps = parseMaps(entries);
        const locations = seeds.map(seed => walkThroughMaps(parseInt(seed), maps));
        return `${Math.min(...locations)}`;
    };

    part2(entries: string[]): string {
        let solution = "???"
        for (let i = 0; i < entries.length; i++) {
            console.log(`entry = ${entries[i]}`);
        }
        return `${solution}`;
    };

    // boiler plate

    basePath(): string {
        return __dirname;
    };

}


