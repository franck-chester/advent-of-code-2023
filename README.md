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

Easy enough but it's been so long since I last coded I couldn't even remember how to find the max value in my array.

Things I'd like to do:
- switch to typescript
- write code that wouldn't get me kicked out 
of a leetcode test
- add a github action to this repo to let me do the 
AoC from my phone

## Day 2: 

Lazy but yet clever approach I'd say - encode the rules rather than calculate them

## Day 3:

It's official, I can't remember how to code anymore. 
Struggled with a variable / function name clash, then whether to use `i+=3` or `i=+3` to step through the list

Code left raw, to show how bad things are right now

## Day 4:

Still a struggle, at least today introduced functions and thanks to breaking them up part 2 was a very simple change.

but tripped on `ParseInt()`, missing it like every year

## Day 5:

Yesterday refactored everything so far to Typescript.
Today struggled with types and RegExp
Then forgot a `\s` and my stacks were wrong

## Day 6:

A few silly mistakes around `substring()`, but all in all an easy challenge, perfect for my having a go a test driven development.

## Day 7:

Not particularly difficult but I made a hash of it.
Issues around 'smallest', and what size I was comparing against.

My tree traversal techniques also found lacking

Not sure how I'd TDD this - need to have a go

## Day 8 :

Day of the xmas do, didn't have much time, and got my knickers in a twist.
Part 2 not done at this stage

## day 9:

Day after the xmas do - too hungover
Part 2 not done at this stage

## Day 10:

A snowy weekend, not muchh time to spend on it but figured it out in the end
