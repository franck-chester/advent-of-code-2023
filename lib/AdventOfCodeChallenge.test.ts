import {jest, test} from "@jest/globals";
import { AdventOfCodeChallenge, determineDataFileName } from "./AdventOfCodeChallenge";

jest.mock("./AdventOfCodeChallenge", () => {
    return {
        part1:jest.fn<AdventOfCodeChallenge>(),

    }
});

// test('determineDataFileName(adventOfCodeChallenge: AdventOfCodeChallenge, isTest : boolean) ', () => {
//     expect(determineDataFileName(testAoC, true).toBe("???");
//   });