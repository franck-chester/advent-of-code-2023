# advent-of-code-2022
My 2022 attempt at the https://adventofcode.com/ challenge.

Competing against my colleagues at the very group, although this year I doubt I'll have sufficient time or head space to have a proper go.

## Typescript setup

I always forget how to get there so, for the record
```
npm i typescript --save-dev 
npm i --save-dev @types/node
npm i --location=global ts-node
npm i ts-node --save-dev
npx tsc --init

npm i --save-dev ts-jest
npm i --save-dev @jest/globals

npx ts-jest config:init

ts-node aoc2022.ts 5 1 

npm test -- day00/Day00.test.ts
```

[ts-jest](https://jestjs.io/docs/getting-started)
## Day 1: 

Shouldn't have taken this long but I really struggled setting up my test suite, and I really wanted a test suite.
First go at part 2 was running regex.exec in a simple loop, but because of edge cases where number words are blended, like `twone` this wasn't working, so switched to matching backward