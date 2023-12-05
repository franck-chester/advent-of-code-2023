import { Day } from "../lib/Day";

export interface range {
    start: number,
    end: number
}
export interface Mapper {
    source: string,
    destination: string,
    ranges: {source : range, destination:range}[]
}


export function parseEmptyMap(entry: string): Mapper | undefined {
    let m = entry.match(/(?<source>.*)-to-(?<destination>.*) map:/);
    if (m) {
        return {
            source: m.groups!.source,
            destination: m.groups!.destination,
            ranges: []
        }
    }
    return undefined;
}

export function parseRangesAndAddToMap(entry: string, map: Mapper): Mapper | undefined {
    //console.log(`    parseRangesAndAddToMap(${entry}, ${JSON.stringify(map)})...`)
    let m = entry.match(/(?<destinationStart>\d*) (?<sourceStart>.*) (?<length>.*)/);
    if (m) {
        const length = parseInt(m.groups!.length);
        const sourceStart = parseInt(m.groups!.sourceStart);
        const destinationStart = parseInt(m.groups!.destinationStart);
        map.ranges.push({source: {
            start: sourceStart,
            end: sourceStart + length - 1

        }, destination : {
            start: destinationStart,
            end: destinationStart + length - 1
        }})
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
    console.log(`parseMaps() : ${JSON.stringify(Object.fromEntries(maps),null, 2)}`)
    return maps;
}


export function mapping(start: number, map: Mapper): number {
    // find source range 
    //console.log(`  mapping(${start}, ${JSON.stringify(map)})...`)
    if(!map) throw `Undefined Map!`;
    const index = map.ranges.findIndex(r => r.source.start <= start && start <= r.source.end);
    if (index > -1) {
        const sourceRange = map.ranges[index].source;
        const destinationRange = map.ranges[index].destination;
        return start + (destinationRange.start - sourceRange.start)
    }
    return start;
}
export function walkThroughMaps(seed : number, maps:Map<string, Mapper> ) : number {
    let step = 'seed';
    let location = seed;
    do{
        //console.log(`walkThroughMaps(${seed}, ...) : location = ${location}, step = ${step}...`)
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
        return "46"
    }


    part1(entries: string[]): string {
        let seeds = entries[0].match(/seeds: (?<seeds>.*)/)!.groups!.seeds.split(' ');
        let maps = parseMaps(entries);
        const locations = seeds.map(seed => walkThroughMaps(parseInt(seed), maps));
        return `${Math.min(...locations)}`;
    };

    part2(entries: string[]): string {
        const seedsRanges = entries[0].match(/seeds: (?<seeds>.*)/)!.groups!.seeds.split(' ').map(e => parseInt(e));
        const maps = parseMaps(entries);
        const locations = [] as number[];
        
        for(let i=0; i< seedsRanges.length; i=i+2){
            const firstSeed = seedsRanges[i]; 
            const lastSeed = seedsRanges[i]+seedsRanges[i+1];

            const seedMap = maps.get('seed')!;
            const soil = [] as number[];
            // find first range that starts after the first seed
            const i1 = seedMap.ranges.findIndex(r=>r.source.start >= firstSeed);
            if(i1 > -1){
                // first seed is before any mapping, so won't be mapped
                soil.push(firstSeed);
            }
            else{
                soil.push(mapping(firstSeed,seedMap));
            }

            // first seed that falls in a range would be beginning of that first range
            //let nextSeed = r.start
        }
        return `${Math.min(...locations)}`;
    };

    // boiler plate

    basePath(): string {
        return __dirname;
    };

}


