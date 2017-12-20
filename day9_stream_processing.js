// Advent of Code 2017 - Day 9
// http://adventofcode.com/2017/day/9

var input = ``; // insert from day9_input.txt

var score = totalScore = 0;
var inGarbage = false;
var garbage = 0;

for (var i = 0; i < input.length; i++) {
    var a = input[i];
    if (a == "!") {
        i++;
    } else  if (inGarbage) {
        if (a == ">") {
            inGarbage = false;
        } else {
            garbage++;
        }
    } else if (a == "<") {
        inGarbage = true;
    } else if (a == "{") {
        score++;
        totalScore += score;
    } else if (a == "}") {
        score--;
    }
}

console.log('Part 1: ' + totalScore);
console.log('Part 2: ' + garbage);