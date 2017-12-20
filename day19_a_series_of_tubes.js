// Advent of Code 2017 - Day 19
// http://adventofcode.com/2017/day/19

var input = ``; // insert from day19_input.txt

var map = input.split('\n').map(x => x.split(''));

var x = map[0].indexOf('|'), y = 0;
const UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3, END = ' ';
var direction = DOWN, steps = 0;
var letters = [];

function changeDirection(y, x, dir) {
    var value = map[y][x];

    if (value >= 'A' && value <= 'Z')
        letters.push(value);

    if (value == '+') {
        if ((map[y - 1][x] == '|' || map[y - 1][x].match(/[A-Z]/g)) && dir != DOWN)
            return UP;
        if ((map[y][x + 1] == '-' || map[y][x + 1].match(/[A-Z]/g)) && dir != LEFT)
            return RIGHT;
        if ((map[y + 1][x] == '|' || map[y + 1][x].match(/[A-Z]/g)) && dir != UP)
            return DOWN;
        if ((map[y][x - 1] == '-' || map[y][x - 1].match(/[A-Z]/g)) && dir != RIGHT)
            return LEFT;
    }
    return dir; // keep going same direction
}

while (map[y][x] != END) {
    steps++;
    switch (direction) {
        case UP:    y--; break;
        case RIGHT: x++; break;
        case DOWN:  y++; break;
        case LEFT:  x--; break;;
    }
    direction = changeDirection(y, x, direction);
}

console.log('Part 1:', letters.join(''));
console.log('Part 2:', steps);