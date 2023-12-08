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

ts-node aoc2023-fn.ts 7 1 test
ts-node aoc2023-fn.ts 7 2

npm test -- day00/Day00.test.ts
```

I'm not being particularly smart with TS, but using strong types saves me from pretty stupid mistakes. 

## Adding a new day

I've created [hygen](https://www.hygen.io/docs/quick-start) templates.
Once hygen is installed (`npm i -g hygen`) adding a new day is as simple as typing:

`hygen day add --day 6`

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

## Day 5: If You Give A Seed A Fertilizer

Part 1 was a lot of parsing but not too hard

Part 2 however couldn't be brute forced, had to have a proper think:
Trick was to map the start and end of each range, creating additional ranges if required, so that the solution 
was the smallest starting value of the final ranges identified
This required me to refactor my arrays, initially started with separate arrays for source and destination, 
but in order to be able to sort the ranges so that the first one was always the one with the smallest staring source, 
had to combine them in a single array of source+destination.

Not that complicated but then again I am not that smart!

## Day 6: Wait For It

surprisingly easy - expected part 2 to use numbers too big for the basic method I used for part 1 , but no, it worked.
part 1 :  Time elapsed : 15 ms
part 2 :  Time elapsed : 912 ms

## Day 7: Camel Cards

All in all not that hard, just needed a lot of test to get the rules right

Day 07 is also when I refactored away from the Day class and introduced a more functional approach

Using dynamic import I can now introduce new days without modifying the main program (now `aoc2023-fn.ts`)

## Day 8: Haunted Wasteland

Part 1 is super easy

Part 2 is too computationaly intensive to brute force.
Took me a while to get my head around it, but started, for each location, tracking the instruction offset that let to an end location.
The idea was that whenever I fell on that instruction again I could shortcut the next round of processing.
Unfortunately that still ran like a hog.
It also looked like I had a bug as the same instruction was always the one logged - the last one.
Looked around twitter and saw someone mention a hidden pattern in the data.

Refactored my first working solution to make it clearer
that it all depends on the pattern hidden in the data, namely:
The data is cyclic : A =[c]=> Z =[c]=> Z =[c]=> Z
Which means the solution if the least common multiple of the cycles for each starting position
Otherwise the solution would NOT work!!

We then have a classic problem: how many cycles to go in total to land on a winning cycle for all locations, which is the least common multiple : the smallest number that is dividable by all.

Quick google to remind myself how to calculate the [Least Common Multiple](https://en.wikipedia.org/wiki/Least_common_multiple#Using_the_greatest_common_divisor), which requires calculating the [Greatest Common Divisor](https://en.wikipedia.org/wiki/Greatest_common_divisor#Euclidean_algorithm) and I eventually got there.

```
Day08 - ACTUAL INPUT 740 LINES PROCESSED
start location [0] : {"location":"GSA","lr":["THS","NKH"],"isStart":true,"isEnd":false,"stepsToNext":19631,"next":"DXZ"}
 19631/293 = 67 ,  19631 mod 293 = 0
start location [1] : {"location":"DLA","lr":["PHM","VQS"],"isStart":true,"isEnd":false,"stepsToNext":17287,"next":"XJZ"}   
 17287/293 = 59 ,  17287 mod 293 = 0
start location [2] : {"location":"MLA","lr":["PTH","JCK"],"isStart":true,"isEnd":false,"stepsToNext":12599,"next":"PXZ"}   
 12599/293 = 43 ,  12599 mod 293 = 0
start location [3] : {"location":"MQA","lr":["HTF","TKM"],"isStart":true,"isEnd":false,"stepsToNext":23147,"next":"QLZ"}   
 23147/293 = 79 ,  23147 mod 293 = 0
start location [4] : {"location":"AAA","lr":["SQV","VLV"],"isStart":true,"isEnd":false,"stepsToNext":13771,"next":"ZZZ"}   
 13771/293 = 47 ,  13771 mod 293 = 0
start location [5] : {"location":"JGA","lr":["PBD","NQT"],"isStart":true,"isEnd":false,"stepsToNext":20803,"next":"TFZ"}   
 20803/293 = 71 ,  20803 mod 293 = 0
end location [0] : {"location":"DXZ","lr":["NKH","THS"],"isStart":false,"isEnd":true,"stepsToNext":19631,"next":"DXZ"}
 19631/293 = 67 ,  19631 mod 293 = 0
end location [1] : {"location":"XJZ","lr":["VQS","PHM"],"isStart":false,"isEnd":true,"stepsToNext":17287,"next":"XJZ"}     
 17287/293 = 59 ,  17287 mod 293 = 0
end location [2] : {"location":"PXZ","lr":["JCK","PTH"],"isStart":false,"isEnd":true,"stepsToNext":12599,"next":"PXZ"}     
 12599/293 = 43 ,  12599 mod 293 = 0
end location [3] : {"location":"QLZ","lr":["TKM","HTF"],"isStart":false,"isEnd":true,"stepsToNext":23147,"next":"QLZ"}     
 23147/293 = 79 ,  23147 mod 293 = 0
end location [4] : {"location":"ZZZ","lr":["VLV","SQV"],"isStart":false,"isEnd":true,"stepsToNext":13771,"next":"ZZZ"}     
 13771/293 = 47 ,  13771 mod 293 = 0
end location [5] : {"location":"TFZ","lr":["NQT","PBD"],"isStart":false,"isEnd":true,"stepsToNext":20803,"next":"TFZ"}
 20803/293 = 71 ,  20803 mod 293 = 0
end location [0] : {"location":"DXZ","lr":["NKH","THS"],"isStart":false,"isEnd":true,"stepsToNext":19631,"next":"DXZ"}     
 19631/293 = 67 ,  19631 mod 293 = 0
end location [1] : {"location":"XJZ","lr":["VQS","PHM"],"isStart":false,"isEnd":true,"stepsToNext":17287,"next":"XJZ"}     
 17287/293 = 59 ,  17287 mod 293 = 0
end location [2] : {"location":"PXZ","lr":["JCK","PTH"],"isStart":false,"isEnd":true,"stepsToNext":12599,"next":"PXZ"}     
 12599/293 = 43 ,  12599 mod 293 = 0
end location [3] : {"location":"QLZ","lr":["TKM","HTF"],"isStart":false,"isEnd":true,"stepsToNext":23147,"next":"QLZ"}     
 23147/293 = 79 ,  23147 mod 293 = 0
end location [4] : {"location":"ZZZ","lr":["VLV","SQV"],"isStart":false,"isEnd":true,"stepsToNext":13771,"next":"ZZZ"}     
 13771/293 = 47 ,  13771 mod 293 = 0
end location [5] : {"location":"TFZ","lr":["NQT","PBD"],"isStart":false,"isEnd":true,"stepsToNext":20803,"next":"TFZ"}     
 20803/293 = 71 ,  20803 mod 293 = 0
have we gone back to start (Z->A)? false,false,false,false,false,false
have we gone back to full circle to the same end point (Z->Z)?? true,true,true,true,true,true
and did it take as many steps from A->Z than Z -> Z ?? true,true,true,true,true,true
and was it always a number of full cycle through the instructions ?? true,true,true,true,true,true


The legend is right, all start positions cycle back to an end position at a fixed frequency :
19631,17287,12599,23147,13771,20803
GSA =[19631 steps] => DXZ
DLA =[17287 steps] => XJZ
MLA =[12599 steps] => PXZ
MQA =[23147 steps] => QLZ
AAA =[13771 steps] => ZZZ
JGA =[20803 steps] => TFZ


 --------------------------------------------------------------------------------
 SOLUTION  Day 08 part 2 : calculated 13129439557681
 Time elapsed : 205 ms
```