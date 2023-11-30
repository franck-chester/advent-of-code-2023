import { Day } from "../lib/Day";

export class Day00 extends Day {
    part1Example(): string {
        return "24000"
    }
    part2Example(): string {
        return "45000"
    }



    part1(entries : string[]): string {
        const elvesCalories = [0];
        let solution = 0;
        let elf = 0;
        for (let i = 0; i < entries.length; i++) {
            console.log(`entry = ${entries[i]}`);
            if (entries[i].length > 0) {
                elvesCalories[elf] += parseInt(entries[i]);
                console.log(`elf = ${elf}, elvesCalories[elf] = ${elvesCalories[elf]}`);
            }
            else {
                elvesCalories.push(0);
                elf++;
                console.log(`elf = ${elf}`);
            }
        }
        solution = Math.max(...elvesCalories);
        return `${solution}`;
    };


    part2(entries : string[]): string {
        const elvesCalories = [0];
        let solution = 0;
        let elf = 0;
        for (let i = 0; i < entries.length; i++) {
            console.log(`entry = ${entries[i]}`);
            if (entries[i].length > 0) {
                elvesCalories[elf] += parseInt(entries[i]);
                console.log(`elf = ${elf}, elvesCalories[elf] = ${elvesCalories[elf]}`);
            }
            else {
                elvesCalories.push(0);
                elf++;
                console.log(`elf = ${elf}`);
            }
        }
        elvesCalories.sort((a, b) => a < b ? 1 : a > b ? -1 : 0)
        solution = elvesCalories[0] + elvesCalories[1] + elvesCalories[2];
        return `${solution}`
    };

    // boiler plate

    basePath(): string {
        return __dirname;
    };

}