///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day19";
export function part1(entries: string[]): string { return part1Implementation(entries); };
part1.day = day;
part1.testFile = 'test.txt';
part1.example = '???';
part1.inputFile = 'input.txt';

export function part2(entries: string[]): string { return part2Implementation(entries); };
part2.day = day;
part2.testFile = 'test.txt';
part2.example = '167409079868000';
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
type Rule = {
    category: string,
    testForGreaterThan: boolean,
    test: number,
    destination: string
}

type Workflow = {
    id: string,
    rules: Rule[],
    defaultDestination: string
}
type Rating = {
    x: number,
    m: number,
    a: number,
    s: number
}
function part1Implementation(entries: string[]) {
    const workflows = new Map<string, Workflow>();
    const ratings = [] as Rating[];
    let readingRatings = false;
    for (let i = 0; i < entries.length; i++) {
        console.log(`parsing ${entries[i]}...`)
        if (entries[i].length === 0) {
            readingRatings = true;
            continue;
        }

        if (readingRatings) {

            const g = entries[i].match(/\{x=(?<x>.*),m=(?<m>.*),a=(?<a>.*),s=(?<s>.*)\}/)!.groups!;
            ratings.push({ x: parseInt(g.x), m: parseInt(g.m), a: parseInt(g.a), s: parseInt(g.s) });
            continue;
        }

        const g = entries[i].match(/(?<id>.*)\{(?<rules>.*)\}/)!.groups!;
        const rulesParts = g.rules.split(',');
        const workflow = {} as Workflow;
        workflow.defaultDestination = rulesParts.pop()!;
        workflow.rules = [] as Rule[];
        workflow.id = g.id;


        rulesParts.forEach(part => {
            const r = part.match(/(?<category>.)(?<sign>.)(?<test>\d*):(?<destination>.*)/)!.groups!
            workflow.rules.push({
                category: r.category,
                testForGreaterThan: (r.sign === '>'),
                test: parseInt(r.test),
                destination: r.destination
            })
            //console.log(`${g.id} : rule = ${JSON.stringify(rule, (_,v)=>v==Infinity?'∞':v)}`)
        });

        workflows.set(g.id, workflow);
    }

    workflows.forEach((workflow, id) => {
        console.log(`${id} : default destination = ${workflow.defaultDestination}, rules :`);
        workflow.rules.forEach(r => console.log(`${JSON.stringify(r)}`));
    });

    const accepted = [] as Rating[];
    ratings.forEach(rating => {

        let destination = 'in';
        let done = false;
        while (!done) {
            let workflow = workflows.get(destination)!;
            let matchesRule = false;
            for (let i = 0; i < workflow.rules.length; i++) {
                const rule = workflow.rules[i];
                const category = rating[rule.category as keyof Rating];
                matchesRule = rule.testForGreaterThan ? (category > rule.test) : (category < rule.test);
                if (matchesRule) {
                    destination = rule.destination;
                    break;
                }
            }
            if (!matchesRule) destination = workflow.defaultDestination;
            if (destination == 'A') {
                accepted.push(rating);
            }
            console.log(`Part: ${JSON.stringify(rating)} : workflow ${workflow.id} destination -> ${destination}`);
            // some weird TS shite here
            // getting TS2367: This comparison appears to be unintentional because the types '"A"' and '"R"' have no overlap.
            // if I simply try done = destination === 'A' || destination === 'R';
            done = ['A', 'R'].includes(destination);
        }
    });

    let solution = 0;
    console.log(`${accepted.length} parts were accepted:`)
    accepted.forEach(a => {
        const totalRating = a.x + a.m + a.a + a.s;
        console.log(`${JSON.stringify(a)}: ${totalRating}`);
        solution += totalRating;
    });

    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
type Rule2 = {
    id: string,
    category: string,
    testForGreaterThan: boolean,
    test: number,
    destinationIfMatches: string,
    destinationIfNot: string
}
type Rating2 = {
    xmin: number,
    mmin: number,
    amin: number,
    smin: number,
    xmax: number,
    mmax: number,
    amax: number,
    smax: number
}
function part2Implementation(entries: string[]) {
    const workflows = new Map<string, Rule2>();
    for (let i = 0; i < entries.length; i++) {
        console.log(`parsing ${entries[i]}...`)
        if (entries[i].length === 0) {
            break;
        }
        const g = entries[i].match(/(?<id>.*)\{(?<rules>.*)\}/)!.groups!;
        const rulesParts = g.rules.split(',');
        let defaultDestination = rulesParts.pop()!;
        if (!['A', 'R'].includes(defaultDestination)) defaultDestination += '0';

        // flatten the rules
        rulesParts.forEach((part, i) => {
            const r = part.match(/(?<category>.)(?<sign>.)(?<test>\d*):(?<destination>.*)/)!.groups!
            const lastRule = i == rulesParts.length - 1;
            const rule = {
                id: `${g.id}${i}`,
                category: r.category,
                testForGreaterThan: (r.sign === '>'),
                test: parseInt(r.test),
                destinationIfMatches: r.destination + (['A', 'R'].includes(r.destination) ? '' : '0'), // the first rule that will be created out of the destination list
                destinationIfNot: lastRule ? defaultDestination : `${g.id}${i + 1}`  // default is the next rule in the list
            };
            workflows.set(rule.id, rule);
            console.log(`${rule.id} : rule = ${JSON.stringify(rule)}`)
        });
    }

    const accepted = [] as Rating2[];

    const states = [] as { rating: Rating2, destination: string }[];
    states.push({
        destination: 'in0',
        rating: {
            xmin: 1,
            mmin: 1,
            amin: 1,
            smin: 1,
            xmax: 4000,
            mmax: 4000,
            amax: 4000,
            smax: 4000
        }
    });

    let iterations = 0;
    while (states.length > 0) {
        iterations++;
        console.log(`${iterations} : ${states.length} state(s) left to process : ${JSON.stringify(states)}`)

        for (let i = states.length - 1; i >= 0; i--) { // iterate backward so that we can add and remove states without messing up our index
            const state = states[i];
            let rating = state.rating;
            let destination = state.destination;

            if (destination == 'A') {
                accepted.push(rating);
                states.splice(i, 1);
                continue;
            }
            if (destination == 'R') {

                states.splice(i, 1);
                continue;
            }

            if (!workflows.has(destination)) {
                throw `Invalid destination "${destination}" when process state :\n ${JSON.stringify(states, null, 1)}`
            }
            let rule = workflows.get(destination)!;

            const rangeMin = `${rule.category}min` as keyof Rating2;
            const rangeMax = `${rule.category}max` as keyof Rating2;
            const min = rating[rangeMin];
            const max = rating[rangeMax];

            let clone = { ...rating };
            if (rule.testForGreaterThan) {
                // does the rating range span the rule?
                if (min < rule.test && max > rule.test) {
                    // split that rating in 2
                    //those above to the destination that matches, 
                    rating[rangeMin] = rule.test +1;
                    state.destination = rule.destinationIfMatches

                    //those below go to the destination that doesn't, 
                    clone[rangeMax] = rule.test;
                    states.push({ rating: clone, destination: rule.destinationIfNot });
                } else if (max <= rule.test) {
                    // the entire range fails the test
                    state.destination = rule.destinationIfNot;
                } else if (min > rule.test) {
                    // the entire range passes the test
                    state.destination = rule.destinationIfMatches;
                } else {
                    throw `this can't happen can it??`
                }

            } else {
                // does the rating range span the rule?
                if (min < rule.test && max > rule.test) {
                    // split that rating in 2
                    //those below to the destination that matches, 
                    rating[rangeMax] = rule.test-1;
                    state.destination = rule.destinationIfMatches

                    //those above go to the destination that doesn't, 
                    clone[rangeMin] = rule.test;
                    states.push({ rating: clone, destination: rule.destinationIfNot });
                } else if (max < rule.test) {
                    // the entire range passes the test
                    state.destination = rule.destinationIfMatches;
                } else if (min >= rule.test) {
                    // the entire range fails the test
                    state.destination = rule.destinationIfNot;
                } else {
                    throw `this can't happen can it??`
                }
            }
        }
    }

    let solution = 0;
    console.log(`${accepted.length} parts were accepted:`)
    accepted.forEach(a => {
        const totalRating = (1+a.xmax - a.xmin) *  (1+a.mmax - a.mmin) *  (1+a.amax - a.amin) *  (1+a.smax - a.smin);
        console.log(`${JSON.stringify(a)}: ${totalRating}`);
        solution += totalRating;
    });

    return `${solution}`;
}