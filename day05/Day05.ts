import { Day } from "../lib/Day";

export interface Range {
    start: number,
    end: number
}
export interface Mapper {
    source: string,
    destination: string,
    ranges: { source: Range, destination: Range }[]
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
        map.ranges.push({
            source: {
                start: sourceStart,
                end: sourceStart + length - 1

            }, destination: {
                start: destinationStart,
                end: destinationStart + length - 1
            }
        })
        return map;
    }
    return undefined;
}

export function parseMaps(entries: string[]): Map<string, Mapper> {
    console.log(`parseMaps()...`)
    const maps = new Map<string, Mapper>();

    for (let i = 2; i < entries.length; i++) {
        console.log(` ...entry = ${entries[i]}, line = ${i}`);
        let map = parseEmptyMap(entries[i]);
        if (map) {
            maps.set(map.source, map);
            while (i++ < entries.length) {
                if (!entries[i] || entries[i].length == 0) break;
                console.log(` ...entry = '${entries[i]}', line = ${i}`);
                parseRangesAndAddToMap(entries[i], map);
            }
            // sort the ranges - very important for later!!
            map.ranges = map.ranges.sort((a,b) => a.source.start - b.source.start);
        }
    }
    console.log(`parseMaps() : ${JSON.stringify(Object.fromEntries(maps), null, 2)}`)
    return maps;
}


export function mapping(start: number, map: Mapper): number {
    // find source range 
    //console.log(`  mapping(${start}, ${JSON.stringify(map)})...`)
    if (!map) throw `Undefined Map!`;
    const index = map.ranges.findIndex(r => r.source.start <= start && start <= r.source.end);
    if (index > -1) {
        const sourceRange = map.ranges[index].source;
        const destinationRange = map.ranges[index].destination;
        return start + (destinationRange.start - sourceRange.start)
    }
    return start;
}
export function walkThroughMaps(seed: number, maps: Map<string, Mapper>): number {
    let step = 'seed';
    let location = seed;
    do {
        //console.log(`walkThroughMaps(${seed}, ...) : location = ${location}, step = ${step}...`)
        let map = maps.get(step)!;
        if (!map) throw `No map for step '${step}'!`;
        location = mapping(location, map);
        step = map.destination;
    } while (step != 'location')
    console.log(`walkThroughMaps(${seed}) => ${location}`);
    return location;
}

export function rangeMapping(sourceRange: Range, map: Mapper): Range[] {
    console.log(`  rangeMapping(${JSON.stringify(sourceRange)}, map})...`);
    if (!map) throw `Undefined Map!`;
    let current = sourceRange.start;
    let mappedRanges = [] as Range[];
    while (current < sourceRange.end) {
        console.log(`  rangeMapping() current = ${current}...`)
        let mappedRange = {start : -1, end: -1} as Range;
        // does position fall within a range?
        let index = map.ranges.findIndex(r => r.source.start <= current && current <= r.source.end);
        if (index == -1) {
            // position is outside any existing range -> no mapping
            mappedRange.start = current;
            // next position is the start of the first range that starts after the current position
            // only works if ranges have been sorted by source start!!
            index = map.ranges.findIndex(r => r.source.start > current);
            if (index == -1) {
                // no range starts after current position - we're done
                mappedRange.end = sourceRange.end
                mappedRanges.push(mappedRange);
                console.log(`  (A) rangeMapping() current = ${current} map to ${JSON.stringify(mappedRange)}`)
                break;
            }
            current = map.ranges[index].source.start;
            mappedRange.end = current;
            console.log(`  (B) rangeMapping() current = ${current} map to ${JSON.stringify(mappedRange)}`)
            mappedRanges.push(mappedRange);
            continue;
        }
        // position falls within a range -> mapping
        mappedRange.start = mapping(current, map);

        // next position is the smallest of either the input or mapping range end
        current = Math.min(sourceRange.end, map.ranges[index].source.end);
        mappedRange.end = mapping(current, map);
        if(current == map.ranges[index].source.end){
            // we've reached the end of the mapping range - increment current
            console.log(`  (C) rangeMapping() current = ${current} map to ${JSON.stringify(mappedRange)}`)
            mappedRanges.push(mappedRange);
            current++;
            continue;
        }
        console.log(`  (D) rangeMapping() current = ${current} map to ${JSON.stringify(mappedRange)}`)
        mappedRanges.push(mappedRange);

    }

    // sort the ranges - very important for later!!
    mappedRanges = mappedRanges.sort((a,b) => a.start - b.start);

    console.log(`  rangeMapping(${JSON.stringify(sourceRange)}, ${JSON.stringify(map)}) : ${JSON.stringify(mappedRanges)} : DONE`)

    return mappedRanges;
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
        let destinationRanges = [] as Range[];
        for (let i = 0; i < seedsRanges.length; i = i + 2) {
            let sourceRanges = [{
                start: seedsRanges[i],
                end: seedsRanges[i] + seedsRanges[i + 1] -1
            }];

            let step = 'seed';

            do {
                console.log(`part2 : step = ${step}, ranges = ${JSON.stringify(sourceRanges)}...`)
                let map = maps.get(step)!;
                if (!map) throw `No map for step '${step}'!`;
                destinationRanges = [];
                sourceRanges.forEach(range=>destinationRanges.push(...rangeMapping(range, map)));
                step = map.destination;
                console.log(`part2 : step = ${step}, ranges = ${JSON.stringify(sourceRanges)} => ${destinationRanges}`)
                sourceRanges = destinationRanges;
            } while (step != 'location')
            destinationRanges.forEach(r => locations.push(r.start));
        }

        return `${Math.min(...locations)}`;
    };

    // boiler plate

    basePath(): string {
        return __dirname;
    };

}


