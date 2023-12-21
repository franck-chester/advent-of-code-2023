/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
// https://en.wikipedia.org/wiki/Least_common_multiple#Using_the_greatest_common_divisor
export function leastCommonMultiple(a: number, b: number): number {
    return (a * b) / greatestCommonDenominator(a, b);
}
// https://en.wikipedia.org/wiki/Greatest_common_divisor#Euclidean_algorithm
function greatestCommonDenominator(a: number, b: number): number {
    return b > 0 ? greatestCommonDenominator(b, a % b) : a;
}
