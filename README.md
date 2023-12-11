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

## Day 9: Mirage Maintenance

An easy one today - shame as it's Saturday and I had time to do a hard one

## Day 10: Pipe Maze

Part 1 wouldn't have been too hard if my Grid class had been ready.
I also coded it as if paths could cross, instead of looking a for the single path and calculating its length.
Definitely needs refactoring

Part 2 : I cam close but actually failed.
But my first 2 attempts were close enough, 9 apart, one too high, the other too low, I ended up triangulating manually (shame on me!!)
I can see in my logs the rows (`059` and `104`) I am getting wrong as it shows Is on the outside left edge which is obviously outside.

```
00 : OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
01 : OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
02 : OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
03 : OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
04 : OOOOOOOOOOOOOOOOOOOOOOOOOOOOF7OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
05 : OOOOOOOOOOOOOOOOOOOOOOOOOOOO||OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
06 : OOOOOOOOOOOOOOOOOOOOOOOOOOOFJ|OOOOOOOOOOOOF7OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOF7OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
07 : OOOOOOOOOOOOOOOOOOOOOOOOOOOL7|OF7OOOOF7OOO|L7OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO|L7OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
08 : OOOOOOOOOOOOOOOOOOOOOOOOOF-7||O||OOOO||OOFJFJF7F---7OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOF7F7F--JFJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
09 : OOOOOOOOOOOOOOOOOOOOOOOOOL7||L7||OOOO||F7L7L-J||F--JOOOOF7OOOOOOOF7OOOOOOOOOOOOOOOOOOOOOOOOOOOOF-7|||||F-7|F7OOOOF7OOOOOOOOOOOOOOOOOOOOOOOOO
010 : OOOOOOOOOOOOOOOOOOOOOOOOOO||L7||L-7F7|LJL7L7F-J||F7F7OF7|L7OOOOOO||OOOOOOOOOOOOOOOOOOF7OOOOF-7FJFJ|LJ|LJO|LJL7OOFJL7OOF7OOOOOOOOOOOOOOOOOOOO
011 : OOOOOOOOOOOOOOOOOOOOOOOOOFJL-JLJF-J|||F7FJFJL--JLJ||L7|||FJOOOOOO|L-7F-7OOOOOOOOOOOOFJL7OOOL7|L7L7L-7L7F-JF--JF7L7FJF-J|OOOOOOOOOOOOOOOOOOOO
012 : OOOOOOOOOOOOOOOOOOOOOOOOOL-7F-7FJOFJ|||LJOL7F--7F7|L7LJ||L-7OOOF7|F-JL7|F7OOOOOF7OOOL-7L7OF-JL7|FJF-JFJL-7L-7FJ|FJL7|F-JOOOOOOOOOOOOOOOOOOOO
013 : OOOOOOOOOOOOOOOOOOOOOOOOOOO||FJL7OL7LJL7F--JL-7LJLJO|F7LJF-JOOFJ||L7F-JLJ|OOOOO|L7F-7OL7|OL-7FJ|L7|F-JOF7L7FJ|FJ|F7LJL7OOOOOOOOOOOOOOOOOOOOO
014 : OOOOOOOOOOOOOOOOOOOOOOOOOOOLJ|F7L7OL-7FJL7F---JOF--7LJL-7L-7F7L7||FJL-7F-JOOOOOL7LJFJOFJL7F-J|OL7LJL7OFJL7|L7||OLJ|F--JOOOOOOOOOOOOOOOOOOOOO
015 : OOOOOOOOOOOOOOOOOOOOOOOOOOOF-J|L-JF--JL7FJL--7F7L7FJF7F-JF-J|L7||||F7FJL--7OF7F7|F7L-7L7FJL-7L-7L7F7L-JF-J|FJ|L7F-JL-7F7OOOOOOOOOOOOOOOOOOOO
016 : OOOOOOOOOOOOOOOOOOOOOOF7OOOL-7|F7OL7F-7||F7F-J||FJL7||L-7|F7L7||LJ|||L7F--JFJ|||LJL-7|FJ|F-7|F-JFJ||F-7L7FJL7|FJL7F--J|L-7OOOOOOOOOOOOOOOOOO
017 : OOOOOOOOOOOOOOOOOOOOOO||F7F7FJLJL7OLJO|LJ|||F-J||F7||L7FJLJL7|||F-J|L7|L7F7L7||L7F-7|LJFJL7||L-7L-J||FJFJ|F-J||OFJL7F7|F-JOOOOOOOOOOOOOOOOOO
018 : OOOOOOOOOOOOOOOOOOOOOO|LJ||||F---JF7OFJF-JLJL-7LJ|LJL7LJF---J|LJL7FJFJ|FJ||O|||FJ|FJL-7L-7|||F-JF-7LJ|FJFJL7O|L-JF-J|||L7OOOOOOOOOOOOOOOOOOO
019 : OOOOOOOOOOOOOOOOF-7OOOL-7||LJL7F7FJL7L7|OF7F-7|F7L7F7L-7L7OF7L7F-J|FJFJL7||FJLJL7||OF7L-7LJLJL--JFJOFJL7|F7L7|F-7L7FJ|L7L-7OOOOOOOOOOOOOOOOO
020 : OOOOOOOOOOOOOOOOL7|F-7F7||L--7LJ|L-7|FJ|FJ|L7|LJL7LJL7O|FJFJL-JL-7|L7L7FJ||L7F--J|L7|L7FJF-7F7F--JF-JF7|LJ|FJLJFJFJL7|O|F-JOOOOOOOOOOOOOOOOO
021 : OOOOOOOOOOOOOOOOO|LJFJ||||F7OL-7|F7|||FJ|FJO|L7F7|F--JFJ|OL7F----JL7|FJ|FJ|O||OF7L7|L7||FJOLJLJF-7L-7|LJOFJL-7FJFJF7||FJL----7OOOOOOOOOOOOOO
022 : OOOOOOOOOOOOOOOOO|F7|FJ||LJL7F7|LJLJ||L7|L-7|FJ|LJ|F7FJFJF7||F7F7F7||L7LJFJFJ|FJL7||FJLJ|F----7L7|F7|L7F7L7F-JL7|O|LJLJF-----JOOOOOOOOOOOOOO
023 : OOOOOOOOOOOOOOF7OLJ|||FJL--7LJ||F--7||FJ|F-J|L7L-7|||L7L7|||||LJ|||||OL7FJOL7|L7FJ||L--7||F---JFJ||LJFJ||FJL7F7||FJF---JOF7F7OOOOOOOOOOOOOOO
024 : OOOOOOOOOOOOOO|L---JLJL7OF7L7FJLJF-JLJL7||F-JFJF-JLJL7|FJ|||||F-J|LJ|F7|L--7||FJ|O||OF7||||F--7L7|L-7L7||L7FJ|LJ||FJF7F--JLJL7OOOOOOOOOOOOOO
025 : OOOOOOOOOOOOOOL--7F--7FJFJL-J|F7O|F7F-7||||F-JOL---7FJ||FJ||||L-7|F7||||F--J|||FJFJ|FJ||||||F-JFJ|F-JFJ||O||FJF-J||O|LJF--7F7L-7OOOOOOOOOOOO
026 : OOOOOOOOOOOOOOOF7||F-J|FJF--7||L7LJ||FJLJLJL7F7OF7O||FJ|L7||||F-J||LJ|LJL7F7|||L7L7LJFJ|LJLJL7FJFJL-7|FJL7|LJFJF7|L-JF7L-7LJ|F-JOOOOOOOOOOOO
027 : OOOOOOOOOOOOOOO|LJ||F7|L-JF7|||FJF7LJL--7F--J||FJ|FJ|L7L7|LJLJL-7||F-JF--J||||L7L7|F7|FJF--7FJL7|F7FJLJF-JL-7L-JLJF7FJL--JF7|L-7OOOOOOOOOOOO
028 : OOOOOOOOOOF7OOO|F-JLJ||F7FJLJLJL7||F7OF7||OF7||L7|L7|FJFJL7F---7LJ||F7|F7FJLJ|FJFJLJ|||FJF7LJF-J||||F--JF7F7L7F---JLJF7F--J|L7FJOOOOOOOOOOOO
029 : OOOOOOOOOFJL7F7LJF---J|||L-----7|||||FJ|||FJLJL7||FJLJFJOO|L7F7L--JLJ||||L--7LJFJF7FJLJ|FJ|F7L-7||||L-7FJ||L7||OF----JLJF7FJOLJOOOOOOOOOOOOO
030 : OOOOOOOOOL-7LJL-7L---7|||OF-7F7||||||L7LJLJF7F7|||L--7L7OFJFJ||F7F7OFJ||L7F-JF-JFJ|L--7||FJ||F7|||||F-J|FJL7||L-JF-----7|LJF-7OF-7OOOOOOOOOO
031 : OOOOOOOOOOOL-7F7L7F--JLJL7L7LJLJ|||||O|F---JLJLJ||F7OL7L7L7L-J||LJL7L7||FJL-7|F7|FJF7O|||L7|||||LJ||L7O||OFJLJF-7L---7OLJF-JFJO|FJOOOOOOOOOO
032 : OOOOOOOOOOOF7LJ|FJL----7FJOL7F-7LJLJ|FJL----7F7O||||F7|FJOL-7FJL7F-JFJLJ|F7O||||||FJL7||L7||LJ|L-7||FJFJL-JF7FJOL-7F7L--7|F7|OFJL7OOOOOOOOOO
033 : OOOOOOOOOOO|L7O||OF7F--JL---JL7L---7|L7F----J||FJ||||LJ|F7F-J|F7||F7L--7|||FJ||LJ|L7FJ|L7|||F-JF7|LJL7L-7F-J|L7F7OLJL---J||LJFJF7L-7OOOOOOOO
034 : OOOOOOOOOOOL7L-JL7||L-------7FJOF--J|O||F7OF7|||FJ||L-7|||L7FJ||||||F7O|||||FJL-7|O||O|FJ||||F7||L7F-JF7||F7L-J|L7OF--7OFJL7FJFJL7FJOOOOOOOO
035 : OOOOOOOOOOOOL---7||L-7F--7F-J|F-JF-7L7||||FJLJ||L7|L7FJ|||FJ|FJ||||||L7|LJ||L7F7|L7||FJL7|||LJ|||FJL7FJ|||||F7OL7L-JF7L7|F-JL7L-7LJOOOOOOOOO
036 : OOOOOOOOF-7F----J|L-7|L-7|L-7|L--JOL7||||||F--J|ILJI|L7||||FJL7||||||FJL-7|L7LJ||FJ|LJF-J||L7FJ|||F7||ILJLJLJL7O|F--JL-J||OF-JF7L7OOOOOOOOOO
037 : OOOOOOOOL7LJF---7L7FJL--J|F7LJF7F---J||||LJ|F-7L7F--JFJLJLJL7FJ||||||L7F7||FJF-J|L7L-7L-7|L7|L-J|||LJ|F-7F----JFJL----7O|L-JF7|L-JOOOOOOOOOO
038 : OOOOOOOOOL-7|F--JFJL----7|||F7||L---7|||L-7LJIL7|L7F7L----7FJL7||||||FJ|||||IL-7|FJF-JF-J|FJL-7FJ||F7|L7LJF7F7O|F-----JFJF-7||L7F7F7OOOOOOOO
039 : OOOOOOOOOOOLJL--7L7OF---JLJLJLJL----JLJ|F-JIF--JL7||L7F-7FJL7FJLJ||LJL7||||L--7LJL7L7FJF7||F7FJ|FJLJLJFJF7|LJL-JL-----7|FJOLJL7||LJL7OOOOOOO
040 : OOOOOOOOOOOF7OF7L7L7L--7F7F-7F--------7|L--7L--7FJ||FJL7|L7FJ|IIFJ|F7FJ|||L7F-JF--JFJ|FJ||||||I|L-7F--JFJLJF7F-7F-----J||F7F-7LJ|F--JOOOOOOO
041 : OOOOOOOOOOO||FJL7L7L7F7LJLJOLJOF--7F--J|F7FJF--JL7||L7FJL-JL7L7FJFJ|LJFJ||FJL7IL--7|FJL7|||||L7L--JL---JIF7|LJO|L7F--7FJ||LJFJOFJ|OOOOOOOOOO
042 : OOOOOOOOOOO||L-7L7L7|||OF--7OF7L-7LJIF7||LJIL-7F7|LJFJL-7F--JFJ|FJIL-7L7||L7FJF--7|||F7|||||L7L7F------7FJLJOF7L-J|F7|L7||F-JF7|FJOOOOF7OOOO
043 : OOOOOOOOOF-JL-7L7|FJLJL-JF7L-JL-7L--7|||L7F-7ILJ|L7FJF-7|L--7L7||IF--JFJLJFJL-JF-J||LJ||||LJFJFJL----7FJL----JL-7FJ|||FJLJL7O|||L-7F--J|OOOO
044 : OOOOOOOOOL---7L-J|L-7F7F-JL-7F-7L-7FJ||L-JL7L-7IL7|L7|FJL7IFJFJ||FJF-7L7IFJF7F7L-7|L7I||||F-JFJF-7F7FJL-7F------JL7|LJ|F--7L7|LJF7LJF--JOOOO
045 : OOOOOF7OOF7F-JF-7L--J|||F---JL7L-7|L-JL-7F7|F-JF7LJFJ||F7L7L-JILJ|FJFJFJFJFJ||L7FJ|FJFJ|LJL7FJIL7LJLJF-7LJF7F7F7F7|L--JL-7L-J|F-JL7FJOOOOOOO
046 : OOOOO|L--J|L-7|OL7F7FJLJL7F7F-JF-JL--7F-J|LJL7FJL-7L-J||L7L7F7IF-J|FJFJIL7L7||FJL7|L7L7|F7FJL--7L--7FJIL--JLJLJ||LJF7F7F7L-7O|L--7LJOOOOOOOO
047 : OOOOFJF7F7L--J|F7|||L-7F7LJ|L7OL7F-7ILJF7|F--J|F--JIF7LJIL7LJL7|F7||FJF--JFJLJL7FJL-JFJ||LJF---JF--J|F7F-------JL7FJLJLJL-7L7|F--JF7OOOOOOOO
048 : OOOOL-JLJ|F7F7||LJ||F-J|L--JFJF-J|FJF7I|LJL7F-JL7F7FJL-7F7L7F-J||LJ||IL-7FJF-7FJL--7IL-JL-7|F7IFJF--J||L---7F7OF-JL------7L7||L7F7||OOOOOOOO
049 : OOOOOF---J|||||L7FJ||F7L---7|OL7FJL-JL-JF-7LJF--J|LJF7FJ|L7|L7FJL7ILJF--JL-JFJ|F7F7L7F7F--J||L-JFJF--JL7IF7LJL-JF-7F7F7F7L7LJL7LJLJL---7OOOO
050 : OOOOOL----J||LJO|L7|||L--7FJL7OLJF-----7L7|F7|IF7|F-JLJIL7LJFJ|F-JF--JF--7F-JILJ||L7LJ|L--7|L7F7|FJF7F7L-JL----7|OLJLJLJ|FJF7O|F----7F-JOOOO
051 : OOOOOOF----JL7F-JFJ||L--7LJF7|F-7L----7|FJ|||L-JLJL-----7|F7L7|L7IL-7FJIFJL-7F7FJ|IL7FJIF7LJILJLJL-JLJL-------7|L---7OF7||FJ|FJL7F-7LJOOOOOO
052 : OOOOOOL7F7F-7||F7L7||OF-JF7|LJL7|F7F7FJLJILJ|F7F7F7F7F7FJ|||FJ|FJF--JL7FJF-7LJ|L7|F7LJF-JL-------7F7IF----7F7FJ|F7F7L7||LJL7LJF7LJFJOOOOOOOO
053 : OOOOOOOLJ||FJ||||FJLJFJF7|||F7FJLJLJLJF----7||LJ||LJLJ||FJ||L7|L7L-7F7||FJIL7FJFJLJL-7L7F7F7F7F-7LJL7L---7LJ|L7LJLJL7LJL---JF7|L-7L-7OF7OOOO
054 : OOOOOOOF-J|L-JLJLJOF7L-JLJLJ||L-----7I|F--7||L-7|L-7F7|||FJ|FJL7|F-J|||||F--J|FJF-7F7|FJ|LJLJLJIL--7|F---JF7L7L--7F7|F7F7F7FJ||F-JF7L-JL7F7O
055 : OOOOOOOL-7|F--7F7F-JL7F---7FJL------JFJL-7|||F-J|F7LJ|LJLJI||II||L7FJLJ||L-7FJ|FJFJ|||L7|F--7F-----JLJF7F-JL7L7F7LJ|||||||LJFJ||F7|L-7F7LJ|O
056 : OOOOOOOOO||L-7|||L--7|L--7LJF--7F----JF7FJLJ|L-7||L--JF---7LJF-J|FJL7IFJ|F-J|I|L7L7|LJILJL-7|L7F7F----JLJF--JOLJ|F-J|||||L-7L-JLJ||F7LJL--JO
057 : OOOOOOOOOLJF7|LJL---JL7F-JF7L7FJ|F7F-7||L7F7|F7||L----JF-7L7I|F-JSF7L7L7|L7FJFJFJFJ|F7F7F7FJL7LJLJF------JF----7|L-7||LJL--JF7IF-JLJL------7
058 : OOOOOOF7F7FJ|L-------7|L--JL-JL7|||L7LJL-J||LJLJL7F7F7FJIL-JILJIILJL7|I|L7||FJFJIL7||LJLJLJF7L7F7FJF7F-7F-JF7F7||F7|LJF----7|L7|F7F7F7F----J
059 : IIIIII|LJ|L7|F-7F-7F-JL7F7F7F--J||L-JOF---JL-7F7FJ||||L---7OOOOOOOF-JL7L7||||FJOF7LJL----7FJL7LJLJFJLJFJ|F-JLJLJLJLJF7L7F-7LJFJLJ|||||L----7
060 : OOOOOOL-7L-J|L7||FJL--7|||||L7F7|L-7F7|F----7LJ|L7||||F--7|IIIIIII|F7FJILJ||LJF-J|IF7F---J|F-JF--7L7F7L-JL---7F7F---JL-JL7L7FJF7FJ|LJ|F7F7FJ
061 : OOOOOOOOL7F7L-JLJ|F---JLJLJ|OLJLJF7LJLJL---7L-7|ILJ||||F7LJIIIIIIILJ|L7IIILJIFJF7L-J|L-7F7|L--JF-JFJ||IF7F---J||L7F7F7F-7L7LJFJ|L-JOOLJLJLJO
062 : OOOOOOOOOLJL----7|L-----7F7L7F-7FJL-7F----7L-7|L--7LJ|||L7IIIIIIIIIIL7L7IIIIFJFJ|F-7L--J|||F-7FJF7|FJL-JLJF7F-JL7||LJLJOL7L--JFJOOOOOOOOOOOO
063 : OOOOOOF7F7F7F7F7||F7F7F7LJL7|L7|L--7LJF--7|F-JL7F7L7FJ||FJIIIIIIIIIIIL-JIIIIL7|FJ|IL7F-7|LJL7LJFJLJ|F7F---JLJF--J||F-7F-7|F-7FJOOOOOOOOOOOOO
064 : OOOOOFJLJLJLJLJLJLJ||LJ|F--JL-JL--7L-7|F-J|L--7||L7|L7LJL7IIIIIIIIIIIIIIIIIII||L-JF-JL7LJF--JF7|F7ILJLJF7F---JF7O|||FJ|FJLJOLJOOOOOOOOOOOOOO
065 : OOOOO|F-7F-7F7F-7F7|L7FJL7F7F-7F-7L--J||F7L---JLJILJI|F-7L7IIIIIIIIIIIIIIIIIILJIF7L7F-JF7L---JLJ||F7F7I||L7F--JL7|LJL-JL--7OOOOOOOOOOOOOOOOO
066 : OOOOOLJFJ|FJ|LJFJ||L-JL--J|LJFJ|FJF7IFJLJL7F7F7F7IF7ILJIL-JIIIIIIIIIIIIIIIIIF7IFJL7LJF7||F7F7F7FJ||LJL-JL-J|F---J|F----7F-JF7OOOOOOOOOOOOOOO
067 : OOOF--7L-JL-JF-JFJL7F7F7F7L7OL7|L-JL-JF7F7LJLJLJL-JL7IF7IF7IIIIIIIIIIIIIIIIFJL7L-7L--JLJLJLJLJ|L7|L-7F-7F7O|L----JL---7|L--JL7OOOOOOOOOOOOOO
068 : OOOL-7|F--7F7L7FJF7LJ||LJL7|F-J|F-----J||L7F7F---7F-JI|L-J|IIIIIIIIIIIIIIIIL-7L7FJF--7F-7F---7L-J|F-J|ILJL-JF-7F7F----J|F----JF7OOOOOOOOOOOO
069 : OOF--JLJF7|||FJ|FJL--J|F7O||L-7|L--7F7I|L7||LJIF7LJF-7|F--JIIIIIIIIIIIIIIIIF-JFJL-JF7LJFJL7F-JF-7LJF7|F-----JOLJ|L---7OLJF-7F7||OOOOOOOOOOOO
070 : OO|F7F7FJ||||L-JL----7LJL7LJF-J|OF7LJL7L-J|L7F7|L7IL7LJL7IIIIIIIIIIIIIIIIF-JF7L-7IFJL7IL--JL-7|I|F-JLJL-----7F7OL---7|F--JFJ||||OOOOOOOOOOOO
071 : OO||LJLJO|LJL---7OF7FJF--JF7|F7|FJL-7FJF7IL-J||L7L7FJF7FJIIIIIIIIIIIIIIIIL--J|F7L7L-7|F7F7F7FJ|FJ|F---------J|L7F7F7LJ|F--JFJLJL-7OOOOOOOOOO
072 : OOLJOOF7FJF7F7F7L-JLJFJF--J|LJLJL--7LJFJL7IF-JL7|FJ|FJLJIIIIIIIIIIIIIIIIIIIIILJL7L--JLJ|||||L-JL-JL--7F------JFJ|||L--JL---JF-7F-JOF7OOOOOOO
073 : OOOOOFJLJFJLJLJL-7F7FJOL--7|F7F7F7OL--JF-JFJF-7LJ|FJL7IF7IIIIIIIIIIIIIIIIIIIIIF-JF7F--7|||||F7IF--7F-J|F------JFJLJF--7F----JOLJOOFJ|OOOOOOO
074 : OOOOOL--7L7OF----J|||OF--7|LJLJLJL---7FJF7|FJI|F7LJF-JFJ|IIIIIIIIIIIIIIIIIIIIIL-7|LJF-J|||||||FJF-JL--JL--7F-7FJF-7L-7|L---7F7OF7OL7|OOOOOOO
075 : OOOOOOF-JFJFJF-7F7||L7L-7|L7F7F7F7F7ILJFJLJL-7LJL-7L--JFJIIIIIIIIIIIIIIIIIIIIIF-JL7IL-7LJLJ|||L7L7IF7F7F--J|FJ|FJO|F7||F7F7LJL-JL7FJ|OOOOOOO
076 : OOOOOO|F7L7L7L7||||L-JF-JL-J|LJLJLJL7IFJF-7F7L7F-7L7F-7L7IIIIIIIIIIIIIIIIIIIIFJF7FJF--JF7F7LJL7L7|FJLJ|L---JL-JL-7||LJLJLJL------J|FJOOOF7OO
077 : OOOOOOLJL-JO|FJ||LJF--JF-7F7|F------JFJFJILJL-J|FJI|L7L-JIIIIIIIIIIIIIIIIIIIIL-JLJFJF7FJ||L7F7L-J|L--7|F------7F-JLJF----7OF7F--7O|L-7F7||OO
078 : OOOOOOOOOF--J|FJL7OL-7FJFJ|LJL-7F----JFJIF7F7F7||F7L-JIF7IIIIIIIIIIIIIIIIIIIIIF-7FJFJLJILJILJL--7|F7I||L---7F7|L-7OFJF---JFJ||F-JFJF-J||||OO
079 : OOOOOOOOOL-7FJL7FJF--J|OL-JF--7LJF---7|F7|LJLJLJLJL7F-7||IIIIIIIIIIIIIIIIIIIIIL7LJFJF--7F7F7F7F-JLJL-JL7IF7LJ||F7|FJFJF--7L7LJL7O|FJF7|LJ|F7
080 : OOOOOOOOOOFJ|F-JL7L7F7|F--7L-7L--JF7I|LJLJF7F------J|FJ|L7IIF---7IIIIIIIIIIIIIFJF7|IL-7||||||LJF--7F7F7L-J|F7|LJLJL7L-JF-JFJF-7|FJL7|||F-J||
081 : OOOOOOOOOOL-JL7F7L7LJLJL7FJF7L----JL7|F7F7|||F---7F7|L7|FJF7L7F-JIIIIIIIIIIIIIL-JLJF--JLJLJLJF7|IFJ|||L7F7LJLJF-7F7|F--JF7L7|OLJ|F-J||||F7||
082 : OOOOOOOOOOOOF7LJL-JF-7F-J|O||OF7OF--JLJLJLJ|LJF-7LJLJFJ||FJ|FJ|F7IF7IIIIIIF7IF-7IF7L---7F-7F-J|L7L-J||FJ||F7F7|FJ|LJL7F7|L-JL7OO||F-JLJLJ|||
083 : OOOOOOOOOOOFJ|OF7F7|FJL-7|FJL-J|FJF7F7F--7FJF7|IL----JFJLJFJL7LJ|FJ|IIIIII|L7|FJFJ|F---JL7LJF-JFJF--J|L-JLJ||||L7L7F-J|||F--7L7FJLJF7F7F7LJ|
084 : OOOOOOOOOOOL7L-JLJLJL--7||L7F-7|L-JLJ||F-JL-J|L-7F7F7I|F7FJIIL-7||FJIIIIIIL7LJL-JFJL-7F7FJF-JF7L7L---JF7IF7LJLJFJO||OFJLJL-7L-JL7F-JLJ|||F7|
085 : OOOOOOOOOOOFJF--7F7F7F7||L7LJFJL7F7F7LJL---7IL--J|LJL7||LJIIF7I|LJ|IIIIIF-7L----7L7F7|||L7L--JL7|IF7F-JL-JL7F-7L-7||FJF7F--JF7OFJ|F7F7LJLJ||
086 : OOOOOOOOOOOL-JF-J|LJLJ||L7L--JF7LJLJL--7F7FJF7IF7|F--J|L--7FJL7L7FJF7F7IL7|F7F7FJFJ|||||FJF---7LJFJ|L-----7||OL-7LJLJFJ||F--JL7L7LJLJL---7||
087 : OOOOOOOOOOOOOOL--JOF7FJL7L-7F7|L7F----7LJLJFJL-JLJL---JF--JL7FJFJL7|LJ|F7|LJLJ|L7|I||LJLJIL--7L-7L7|IF7IF-J|L--7|F-7FJOLJ|F---JFJF-7F----J||
088 : OOOOOOOOOOOOOOOF7F-JLJF7L--J|||FJ|F---JIF--JF7F-------7|F7F7|L7L7FJL7FJ||L---7L7|L7|L7F7F7F7FJF-JFJL-JL7L7OL-7FJ|L7|L----JL----JFJO|L-7F-7||
089 : OOOOOOOOOOF7F7FJ|L----JL-7F-JLJL-JL--7F-JF7FJ|L-----7I|LJLJ|L7|FJ|F7|L7||F7F7L7|L7||FJ|LJLJ|L7|F7L----7|IL7F7LJFJFJ|F--7F7F--7F7L-7|F7LJFJLJ
090 : OOOOOOOOOO|LJ|L7|F-------J|F7F7OF7OF7||F-JLJFJF--7F-JFJF7F-JFJ|L7||||FJ|LJLJ|FJL7|LJL7L---7|I||||F----JL--J|L-7|FJOLJF7|||L-7||L-7|LJL7FJOOO
091 : OOOOOOOF7OL7FJFJ|L--------J||||FJL-JLJ|L---7L7L-7LJF7L-JLJF7L7L7|||LJL7L---7|L-7||F-7L7F-7|L-J|||L-7F------JF-JLJF7F-J|LJL7FJLJOFJL7F7||OOOO
092 : OOOOOOO||F-JL7L7L7F--7F7F7FJLJLJF--7F7|F---JIL--JIFJL7F-7FJL7|FJ|LJF--JF7F7||F-JLJL7L-JL7|L-7FJ|L-7LJF7F7F7FJOF7FJLJF-JF7FJL---7L--J|LJL-7OO
093 : OOOOOOO||L-7FJFJFJL-7LJLJLJF7F7FJF-J|||L------7F7FJF-JL7|L-7LJ|FJF-JF7I|||LJ|L--7F7L-7F7||F-JL7L7FJIFJLJLJLJF7|LJF7FJF7||L7F---JF7F7L-7F7|OO
094 : OOOOF7O||OFJ|OL7|F7FJF7F-7FJLJ||OL--JLJF---7F7|||L7|F--J|F7L-7|L7L--JL-J|L-7L7F-J|L--J|LJ||F-7L-JL7FJF------JLJF7||L-JLJL7||F7F7|LJ|F7LJLJOO
095 : OOOO|L-JL7L7|F-J||||FJ||FJ|F--J|F7F--7FJIF7LJLJ||FJ|L7F-J||IFJ|IL7F-----JF7|FJL7FJF7F7|F7|LJFJF-7FJL7|IF---7F--JLJL7F7F7FJLJ||||L7FJ|L7F7OOO
096 : OOOOL-7F7L7||L-7|||LJOLJL-JL---J||L7I||F7||F7IFJ||FJFJL7FJL7L7|F7||IF7F-7||||F7||FJ|||LJ||F7L-JFJ|F7LJFJF7OLJF7F7OFJ|LJLJF7O|LJL-J|FJFJ||OOO
097 : OOOOOOLJL7LJL--JLJ|F7F7F7F7F-7F7||OL7|LJLJ||L7L7|||I|F-JL-7|I|||||L-J||FJ|LJ||||LJFJ||F7||||IF7L7LJL7IL-JL---JLJL7L7|OF--JL-JF7F7FJL7L-JL-7O
098 : OOOOOOOOOL7F-7F7F7|||||||||L7||LJL--JL7F--J|FJI||||FJL-7F-J|FJLJ||F--J||IL-7LJLJF7|FJLJ||LJ|FJ|IL-7FJF-------7F-7L7LJFJF7F--7|LJ||OFJF-7F-JO
099 : OOOOOOOOOFJ|O|||||LJLJLJLJL-JLJF7F---7||F7FJL-7||||L7F-JL7FJ|F-7|||IF7|L7F7L--7FJLJL--7||F-JL7|F7FJL7L----7F-JL7L7L--JFJLJF7LJF-JL7L7|OLJOOO
0100 : OOOOOOOOOL7|FJ|LJL7F-7F7F7F7F-7|LJF--JLJ|||F--J||||FJ|F7FJ|ILJI|LJL-J||FJ||F--J|F7F7F-JLJL7F-J|||L-7|IF---JL--7|OL7F--JF--JL-7L--7L-JL--7F7O
0101 : OOOOOOOOOFJ|L-JOF-JL7||||||||OLJF7L---7FJLJ|F7FJ|||L7LJ||FJF-7FJF-7F7||L7||L--7||LJ|L---7FJL-7LJ|F-JL7|F-----7LJF7LJOF7L--7F-JF7OL7F7F--J||O
0102 : OOOOOOOOOL7|F--7L---J||LJLJLJF--J|F---JL-7FJ||L7||L7|F-J||IL7|L7|ILJLJL7|||IF7|LJF-JF7F7|L-7I|F-JL-7FJLJIF---JF-JL7F-JL7F-JL--JL-7|||L7F-J|O
0103 : OOOOOOOOOOLJL-7|OF7F7LJF-7F-7L--7|L-7F7F7|L7|L7|LJFJ||F7||F7||FJL7F7F7FJ||L7||L-7L7FJ||LJF-JFJL7F-7||F7F-JF7F7L7F7LJF-7LJF-7F--7FJLJL7LJF7|O
0104 : IIIIIIIIIIIF--JL-JLJL-7L7|L7L---J|F-J|||||FJL7|L7FJO||||||||||L7FJ||||L7||FJ||F7|FJ|FJL-7|F7L-7|L7|||||L--JLJL-J|L7FJI|F-JFJ|F7LJIIIIL7FJ|L7
0105 : OOOOOOOOOOOL-----7F7F-JFJL-JF7F-7LJF7|LJ|||F7||FJ|F7||||||||||FJ|FJ|||FJ||L7|||||L7|L7F-J|||F7||FJ||||L7F-7F----JFJ|F-JL-7L7LJL7F7OOOFJ|OL7|
0106 : OOOOOOOOOOOOF----J||L-7L--7FJ||OL7FJ|L-7||||LJ||O||||||LJ||LJ||FJ|O||||OLJO||||||OLJO|L-7||LJ||||FJ|||FJ|OLJF--7OL7|L----JOL7F7LJL--7|FJOOLJ
0107 : OOOOOOOOOOOFJF7F--JL-7L---J|FJ|F-J|FJF7||||L-7|L7||LJ|L7O|L-7||L7L7LJLJF---J|LJ|L7F--JF7|||F7LJ|||FJ||L7L---JF7L7OLJF----7OFJ||F-7F-JLJOOOOO
0108 : OOOOOOOOOOOL-JLJF----JF--7FJL7||F-JL7|||LJL7FJL7||L-7L7L7|F7|LJO|FJOF7FJF7F7L7FJFJL-7FJLJ|LJL7O||||FJ|FJF7F7FJL7L---JF--7L7L-J|L7|L7OOOOOOOO
0109 : OOOOOOOOOOOOOF--JF7F--JF7||F7||||F--J||L7F7||OFJ|L7FJOL7|LJLJOF7||F7||L7|LJL7||FJF--JL-7FJF-7L7|||||FJL7||||L7OL7F-7FJF7L7L--7|FJL-JOOOOOOOO
0110 : OOOOOOOOOOOOO|F--J||F--JLJ||LJ|||L--7||FJ|LJL7L7L7|L--7|L---7FJLJLJLJ|FJL-7FJ||L7|F7F7FJL7|OL7|LJLJ|L7FJ||||FJF7LJFJL-JL7|F7FJ|L-7OOOOOOOOOO
0111 : OOOOOOOOOOOOOLJF--J|L--7F-JL--JLJOF-J||L7L-7FJO|FJ|F7FJL7F-7||F-7F7F-J|F7FJL7|L7||||||L7FJL-7|L-7F-JFJL7||||L-JL-7L--7F7|||||O|F-JOOOOOOOOOO
0112 : OOOOOOOOOOOOOF-JF-7|F--J|OF7F7F7F7|F-JL7|OFJ|OFJL7|||L7OLJO||||FJ||L7FJ|LJF-J|O||LJ|||FJL7F-JL7FJL7FJOFJ||||F7F-7L--7||LJ|||L7|L--7OOOOOOOOO
0113 : OOOOOOOOOOF--JF7L7LJL---JFJLJLJLJLJL--7|L7L7L7L7FJ||L7|F--7||LJL7||FJ|FJF-JF7L7||F-J|LJF-J|OF-JL-7||F7L7|||||||FJF-7||L-7|||FJL-7FJOOOOOOOOO
0114 : OOOOOOOOOOL-7FJ|FJOF----7|F--7F---7F-7|L-JOL7L7|L7LJO|||F-J|L7F-J||L7||FJF7||FJLJ|F7L7OL-7L7L-7F7||LJL7||||||||L7|FJ|L7FJLJ|L7OOLJOOOOOOOOOO
0115 : OOOOOOOOOOOFJL7LJF7L---7|LJF7LJF--JL7|L-7F--JFJL-JOF-JLJL-7|FJ|F-J|FJ||L7|LJ||F7O||L7L7F7L7|OFJ||||F-7|LJLJLJ|L7||L7L7LJF-7|FJOOOOOOOOOOOOOO
0116 : OOOOOOOOOOFJF7|F-JL7F--JL--JL--JF-7FJL7FJL7F7L----7L7F-7F7|LJFJ|F-J|FJ|O||F-JLJL7||OL7LJL7|L7L7||||L7|L7F7OF7L7||L7L7L7OL7LJL7OOOOOOOOOOOOOO
0117 : OOOOOOOOOOL7|||L--7LJF-7F7F-7F-7L7|L-7||OFJ||F7F7FJO||FJ|LJF7L-JL7FJ|FJFJ|L-7F7FJ|L-7L7F7||FJO||||L7|L7||L-JL7LJ|FJOL7L7OL--7|OOOOOOOOOOOOOO
0118 : OOOOOOOOOOO||LJF--JF-JOLJ||FJL7L7||F-J|L7|FJ||||LJOFJ|L7L--JL--7FJL7||OL7|F7||LJOL--JOLJ||||F-J|LJO||O|LJF--7|OOLJF7O|FJOOOO|L7OOOOOOOOOOOOO
0119 : OOOOOOOOOOO||OOL-7FJOF7F-J|L7FJFJ||L7FJFJLJFJ|||F--JFJFJF7F7F--JL7FJ|L-7LJ|||L-7F7OF-7F-J||||F7L7OFJ|FJF7L-7LJOOOFJ|FJL7OOOOL-JOOOOOOOOOOOOO
0120 : OOOOOOOOOOOLJOF--J|F-J|L-7|FJL7L7|L-JL7L-7OL-J|||F7FJFJFJ|||L-7F-J|FJF7|F-JLJF7LJL-JFJL-7|LJ||L7L7L-JL7||F7L7F7OFJFJ|F-JOOOOOOOOOOOOOOOOOOOO
0121 : OOOOOOOOOOOOOOL---JL-7L--J|L7FJFJL---7|F7L---7||LJ||OL7|OLJL-7||F7||FJLJL-7F7||F-7F7L--7|L-7|L7L7L7F--J|LJL-J|L7|FJO||OOOOOOOOOOOOOOOOOOOOOO
0122 : OOOOOOOOOOOOOOOF----7L-7F7|OLJOL7F7F7|||L-7F7|||F-J|F-JL----7||LJ|||L7F---J|||||FJ||F7FJ|F7|L7|OL7|L7F7L-7F-7|FJ||F7LJOOOOOOOOOOOOOOOOOOOOOO
0123 : OOOOOOOOOOOOOOFJF--7L-7LJ|L-7F--J|LJLJ|L-7||LJ|||F7|L7F-7F--JLJF-J||FJL-7F7|||||L7|LJ||O||LJOLJF-JL7LJ|F7LJFJ|L-JLJL7OOOOOOOOOOOOOOOOOOOOOOO
0124 : OOOOOOOOOOOOOOL7L7FJF7L--JF7||F-7L7OF7L7FJ|L7FJ|||||FJ|O|L----7|F7|||F--J|||LJ|L7|L7OLJFJL-7F--JF-7L7FJ||F7L-JF7F7F7L7OOOOOOOOOOOOOOOOOOOOOO
0125 : OOOOOOOOOOOOOOOL-JL-JL-7F7|LJ||OL7L7||OLJOL-JL7|LJ||L7|FJF----JLJ||LJL7F7||L-7L-J|FJF7OL7F-JL7F7L7|FJL-JLJL7F-JLJLJL-JOOOOOOOOOOOOOOOOOOOOOO
0126 : OOOOOOOOOOOOOOOOOF-----J||L7OLJF7L7LJL7OF7F7OFJL7FJL7||L7L------7||F--J|LJL-7|F--J|FJL7O|L7F-J||FJ|L7F-----JL-------7OOOOOOOOOOOOOOOOOOOOOOO
0127 : OOOOOOOOOOOOOOOOOL-7F7F7|L7L---J|OL7F7L-JLJL7L7FJL7FJLJFJF7F-7F7|||L7F7L---7LJL--7LJF7L7L-J|F7||L7|FJL--7F-7F7F7F-7FJOOOOOOOOOOOOOOOOOOOOOOO
0128 : OOOOOOOOOOOOOOOOOOOLJ|||L7L7F7F7|F-J||F-7F-7L7LJOO||F-7L7||L7||||||OLJL7F--JF----JF-JL7L--7|||||FJ||OOF-JL7||LJ||OLJOOOOOOOOOOOOOOOOOOOOOOOO
0129 : OOOOOOOOOOOOOOOOOOF--J|L7|FJ||||||F7||L7||OL-JOOF7LJL7L7||L-J||LJLJOOF-JL-7FJF-7F7L7F7L7F7|LJ|||L7||OOL--7|LJF-J|OOOOOOOOOOOOOOOOOOOOOOOOOOO
0130 : OOOOOOOOOOOOOOOOOOL--7|O||L7|LJ||LJ|||FJ|L----7O|L--7L7LJL--7LJOOOOOOL-7F7|L-JFJ||FJ||OLJ||OOLJ|FJ||OOOOOLJOOL--JOOOOOOOOOOOOOOOOOOOOOOOOOOO
0131 : OOOOOOOOOOOOOOOOOOOOOLJOLJFJ|F-JL7OLJ||O|F7F--JOL--7|FJF-7F7L7OOOOOOOOOLJ||OF-JFJ||O||F7OLJOOF-JL7LJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
0132 : OOOOOOOOOOOOOOOOOOOOOOOOOOL7|L7F7|F--JL7LJ||OOOOOF-JLJFJFJ|L7L-7OOOOOOOOOLJFJF7|FJL-JLJL--7OOL---JOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
0133 : OOOOOOOOOOOOOOOOOOOOOOOOOOO||OLJLJL-7F7L-7||OOOOOL7F-7L7|FJFJF-JOOOOOOOOF--JFJ||L7F7F7F7F7|OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
0134 : OOOOOOOOOOOOOOOOOOOOOOOOOOOLJOOOOOOO||L7FJLJOOOOOO||OL7||L7L-JOOOOOOOOOOL-7FJO|L7LJ||LJLJLJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
0135 : OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOLJOLJOOOOOOOOOLJOFJ||FJOOOOOOOOOOOOOOOLJOOL-JF-JL7OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
0136 : OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO|FJLJOOOOOOOOOOOOOOOOOOOOOOO|F7FJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
0137 : OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOLJOOOOOOOOOOOOOOOOOOOOOOOOOOLJ||OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
0138 : OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO||OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
0139 : OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOLJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
--- ---------------------
```