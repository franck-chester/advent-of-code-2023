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
type Rule ={
    xG : number,
    xL : number,
    xDestination : string,
    mG : number,
    mL : number,
    mDestination : string,
    aG : number,
    aL : number,
    aDestination : string,
    sG : number,
    sL : number,
    sDestination : string,
    defaultDestination : string
}
// type Workflow = {
//     id: string,
//     rule: Rule,
// }
type Rating = {
    x:number,
    m:number,
    a:number,
    s:number
}
function part1Implementation(entries: string[]) {
    const workflows = new Map<string, Rule>();
    const ratings = [] as Rating[];
    let readingRatings = false;
    for(let i=0; i<entries.length; i++){
        console.log(`parsing ${entries[i]}...`)
        if(entries[i].length === 0) {
            readingRatings = true;
            continue;
        }

        if(readingRatings){
            
            const g= entries[i].match(/\{x=(?<x>.*),m=(?<a>.*),a=(?<m>.*),s=(?<s>.*)\}/)!.groups!;
            ratings.push({x:parseInt(g.x), m:parseInt(g.m), a:parseInt(g.a), s:parseInt(g.s)});
            continue;
        }

        const g = entries[i].match(/(?<id>.*)\{(?<rules>.*)\}/)!.groups!;
        const rulesParts = g.rules.split(',');
        const rule = {} as Rule;
        rule.defaultDestination = rulesParts.pop()!;
        rule.xG = Number.POSITIVE_INFINITY,
        rule.xL = Number.NEGATIVE_INFINITY;
        rule.xDestination = 'n/a';
        rule.mG = Number.POSITIVE_INFINITY,
        rule.mL = Number.NEGATIVE_INFINITY;
        rule.mDestination = 'n/a';
        rule.aG = Number.POSITIVE_INFINITY,
        rule.aL = Number.NEGATIVE_INFINITY;
        rule.aDestination = 'n/a';
        rule.sG = Number.POSITIVE_INFINITY,
        rule.sL = Number.NEGATIVE_INFINITY;
        rule.sDestination = 'n/a';

        rulesParts.forEach(part=> {
           const r = part.match(/(?<idAndSign>.{2})(?<test>\d*):(?<destination>.*)/)!.groups!
           switch(r.idAndSign){
            case 'x>' : {
                rule.xG = parseInt(r.test);
                rule.xL = Number.NEGATIVE_INFINITY;
                rule.xDestination = r.destination;
                break
            }
            case 'x<' : {
                rule.xL = parseInt(r.test);
                rule.xG = Number.POSITIVE_INFINITY;
                rule.xDestination = r.destination;
                break
            }
            case 'm>' : {
                rule.mG = parseInt(r.test);
                rule.mL = Number.NEGATIVE_INFINITY;
                rule.mDestination = r.destination;
                break
            }
            case 'x<' : {
                rule.mL = parseInt(r.test);
                rule.mG = Number.POSITIVE_INFINITY;
                rule.mDestination = r.destination;
                break
            }
            case 'a>' : {
                rule.aG = parseInt(r.test);
                rule.aL = Number.NEGATIVE_INFINITY;
                rule.aDestination = r.destination;
                break
            }
            case 'x<' : {
                rule.aL = parseInt(r.test);
                rule.aG = Number.POSITIVE_INFINITY;
                rule.aDestination = r.destination;
                break
            }
            case 's>' : {
                rule.sG = parseInt(r.test);
                rule.sL = Number.NEGATIVE_INFINITY;
                rule.sDestination = r.destination;
                break
            }
            case 'x<' : {
                rule.sL = parseInt(r.test);
                rule.sG = Number.POSITIVE_INFINITY;
                rule.sDestination = r.destination;
                break
            }
        }
        //console.log(`${g.id} : rule = ${JSON.stringify(rule, (_,v)=>v==Infinity?'∞':v)}`)
        });

        workflows.set(g.id, rule);
    }

    workflows.forEach((rule, id) => console.log(`${id} : ${JSON.stringify(rule,(_,v)=>Math.abs(v)==Infinity?'∞':v)}`))

    let solution = '???'
    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[]) {
    let solution = '???'
    return `${solution}`;
}