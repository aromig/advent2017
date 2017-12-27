// Advent of Code 2017 - Day 25
// http://adventofcode.com/2017/day/25

const LEFT = -1, RIGHT = 1;

var blueprint = {
    a: [ { value: 1, move: RIGHT, state: 'b' },
         { value: 0, move: LEFT, state: 'b' } ],
    b: [ { value: 1, move: LEFT, state: 'c' },
         { value: 0, move: RIGHT, state: 'e'} ],
    c: [ { value: 1, move: RIGHT, state: 'e' },
         { value: 0, move: LEFT, state: 'd' } ],
    d: [ { value: 1, move: LEFT, state: 'a'},
         { value: 1, move: LEFT, state: 'a'} ],
    e: [ { value: 0, move: RIGHT, state: 'a'},
         { value: 0, move: RIGHT, state: 'f'} ],
    f: [ { value: 1, move: RIGHT, state: 'e'},
         { value: 1, move: RIGHT, state: 'a'} ]
}

var steps = 12861455, size = 15000, idx = Math.ceil(size / 2) - 1;
var state = 'a';
var machine = newFilledArray(size, 0);

for (var i = 0; i < steps; i++) {
    var val = machine[idx];
    var cfg = blueprint[state][val];
    machine[idx] = cfg.value;
    idx += cfg.move;
    state = cfg.state;
}

var checksum = machine.reduce((sum, val) => sum + val);

console.log('Checksum:', checksum);

function newFilledArray(size, val) {
    var arr = [];
    for (var i = 0; i < size; i++) {
        arr.push(val);
    }
    return arr;
}