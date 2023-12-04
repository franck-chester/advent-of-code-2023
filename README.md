# advent-of-code-2023
My 2023 attempt at the https://adventofcode.com/ challenge.

Competing against my colleagues at the very group, although this year, again, I don't really have the time or headspace to do it properly. 
Don't expect nice or smart code, this is panic coding at its finest. 
I will however build on last year and unit test (with [ts-jest](https://jestjs.io/docs/getting-started)) as much as possible. 

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

ts-node aoc2023.ts 5 1
ts-node aoc2023.ts 5 1 test

npm test -- day00/Day00.test.ts
```

I'm not being particularly smart with TS, but using strong types saves me from pretty stupid mistakes. 

## Adding a new day

I've created [hygen](https://www.hygen.io/docs/quick-start) templates.
Once hygen is installed (`npm i -g hygen`) adding a new day is as simple as typing:

`hygen day add --day 06`  NB: use a 2 digit day!

## Day 1: Trebuchet?!

Shouldn't have taken this long but I really struggled setting up my test suite, and I really wanted a test suite.
First go at part 2 was running regex.exec in a simple loop, but because of edge cases where number words are blended, like `twone` this wasn't working, so switched to matching backward

## Day 2: Cube Conundrum

misread part 1, was not looking at individual sets, was adding it all up, then faffed with tests again, still cramming too much into each piece of code

## Day 3: Gear Ratios
- I'm very bad at this. Still struggling with my toolset, typsecript, jest, etc
- I also made the mistake to assume part 2 was going to be about vertical or even diagonal numbers so geared (pun intended) my code for that, proper YAGNI

Looking at my faster colleagues solutions, the biggest difference is that by now they've built themselves a library of AoC utilities whereas I still address each problem from scratch. 
So now, on my todo list are:
- Grid object with built in rows and columns iterator, `nearNeighbours(x, y)`, `subGridAt(x, y)`, etc...

Also I have too many class members that ought to be functions. In fact, this might be an occasion tonuse functional programming and monads... or not (again, head space) 

## Day 4: Scratchcards

Not a particularly difficult one, I'm just very slow.

Got stupidly caught by the extra padding spaces between the numbers in part 1
