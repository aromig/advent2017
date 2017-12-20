// Advent of Code 2017 - Day 8
// http://adventofcode.com/2017/day/8

var input = ``; // insert from day8_input.txt

lines = [];
instructions = [];
registers = [];
highestMax = 0;

input = input.split('\n');
input.forEach(function(line) {
    lines.push(line.split(' '));
});

// extracts each line's instructions into a string to eval()
for (var i = 0; i < lines.length; i++) {
    var operation = (lines[i][1] === 'inc') ? parseInt(lines[i][2]) : parseInt(lines[i][2] * -1);
    var instruction = "if (registers['" + lines[i][4] + "']" + lines[i][5] + lines[i][6] + ") { registers['" + lines[i][0] + "'] += " + operation + "; }";
    instructions.push(instruction);
}

// dynamically declare all registers
lines.forEach(function(line) {
    registers[line[0]] = 0;
});

// run each instruction (and check if there's a new all-time max for part 2)
instructions.forEach(function(todo) {
    eval(todo);
    var checkMax = Math.max.apply(null,
        Object.keys(registers).map(function (e) {
            return registers[e];
        }));
    highestMax = (checkMax > highestMax) ? checkMax : highestMax;
});

var maxValue = Math.max.apply(null,
    Object.keys(registers).map(function(e) {
        return registers[e];
    })
);

console.log('Part 1: ' + maxValue);
console.log('Part 2: ' + highestMax);