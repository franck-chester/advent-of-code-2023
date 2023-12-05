import { Day } from "../lib/Day";

export interface range {
    start: number,
    length: number,
    end : number
}
export interface Mapper {

    destination: string,
    sourceRanges: range[],
    destinationRanges: range[]

}

export function mapping(start:number, map: Mapper) : number{
    // find source range 
    const index = map.sourceRanges.findIndex(r=> r.start <= start && start <= r.end);
    if(index > -1){
        const sourceRange = map.sourceRanges[index];
        const destinationRange = map.destinationRanges[index];
        return start + (destinationRange.start - sourceRange.start)
    }
    return start;
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
        let solution = 0
        let seeds = entries[0].match(/seeds: (<seeds>.*)/)!.groups!.seeds.split(' ');
        let maps = new Map<string, Mapper>();

        for (let i = 2; i < entries.length; i++) {
            console.log(`entry = ${entries[i]}`);
            let m = entries[0].match(/(<source>.*)-to-(<destination>.*) map:/);
            if (m) {
                let map = {} as Mapper;
                map = {
                    destination: m.groups!.destination,
                    sourceRanges: [],
                    destinationRanges: []
                }

                maps.set(m.groups!.source, map);
                while (i < entries.length) {
                    i++; 
                    let m = entries[0].match(/(<sourceStart>\d*) (<destinationStart>.*) (<length>.*)/);

                    if (m) {
                        const length= parseInt(m.groups!.length);
                        const sourceStart = parseInt(m.groups!.sourceStart);
                        const destinationStart = parseInt(m.groups!.destinationStart);
                        map.sourceRanges.push({
                            length,
                            start : sourceStart,
                            end : sourceStart + length
                            
                        });
                        map.destinationRanges.push({
                            length,
                            start : destinationStart,
                            end : destinationStart + length
                        });

                    } else {
                        // this must be our empty line
                        break;
                    }

                }
            }

        }
        return `${solution}`;
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