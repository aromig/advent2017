// Advent of Code 2017 - Day 5
// http://adventofcode.com/2017/day/5

var inputString = ``; // insert from day5_input.txt

inputString = '[' + inputString.replace(/\n/g, ',') + ']';

var input = eval(inputString);

var mazeSize = input.length;
var steps = 0;
var position = 0;
var offset;

// Part 1

while (position < mazeSize) {
    offset = input[position];
    input[position] += 1;
    position += offset;
    steps++;
}

console.log('Part 1: ' + steps);

// Part 2

input = eval(inputString);
steps = 0;
position = 0;

while (position < mazeSize) {
    offset = input[position];
    input[position] += (offset >= 3) ? -1 : 1;
    position += offset;
    steps++;
}

console.log('Part 2: ' + steps);