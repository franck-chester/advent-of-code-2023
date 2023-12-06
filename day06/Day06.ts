import { Day } from "../lib/Day";

export interface Race {
    time: number,
    distance: number
}

export function calculateMaxDistanceForHold(hold: number, race: Race): number {
    return hold * (race.time - hold);
}

export function calculateOptions(race: Race): number[] {
    const result = [];

    for (let hold = 0; hold < race.time; hold++) {
        const maxDistance = calculateMaxDistanceForHold(hold, race);
        if (maxDistance > race.distance) {
            result.push(hold);
            continue;
        }
    }
    console.log(`calculateOptions(${JSON.stringify(race)}) = ${result.length} options`);
    return result;
}
export class Day06 extends Day {
    testFilePart1() { return 'test.txt' };
    testFilePart2() { return 'test.txt' };
    part1Example(): string {
        return "288"
    }
    part2Example(): string {
        return "71503"
    }

    part1(entries: string[]): string {
        const times = entries[0].split(/\s+/).slice(1).map(e => parseInt(e));
        const distances = entries[1].split(/\s+/).slice(1).map(e => parseInt(e));
        const races = [] as Race[];
        times.forEach((t, i) => races.push({ time: times[i], distance: distances[i] }));

        let solution = 1;
        races.forEach(r => solution *= calculateOptions(r).length);
        return `${solution}`;
    };

    part2(entries: string[]): string {
        const time = parseInt(entries[0].split(/\s+/).slice(1).join(''));
        const distance = parseInt(entries[1].split(/\s+/).slice(1).join(''));
        const race = { time, distance }
        let solution = calculateOptions(race).length;
        return `${solution}`;
    };

    // boiler plate

    basePath(): string {
        return __dirname;
    };

}


