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
part2.example = '???';
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
            if(!matchesRule) destination = workflow.defaultDestination;
            if (destination == 'A') {
                accepted.push(rating);
            }
            console.log(`Part: ${JSON.stringify(rating)} : workflow ${workflow.id} destination -> ${destination}`);
            // some weird TS shite here
            // getting TS2367: This comparison appears to be unintentional because the types '"A"' and '"R"' have no overlap.
            // if I simply try one = destination === 'A' || destination === 'R';
            done = destination === 'A';
            done = done || destination === 'R';
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
function part2Implementation(entries: string[]) {
    let solution = '???'
    return `${solution}`;
}