// Advent of Code 2017 - Day 11
// http://adventofcode.com/2017/day/11

var input = ``; // insert from day11_input.txt

var route = input.split(',');
var x = y = steps = farthest = 0;

/* axial coordinates

x, y -> center = 0, 0
n = x + 0, y - 1
ne = x + 1, y - 1
se = x + 1, y + 0
s = x + 0, y + 1
sw = x - 1, y + 1
nw = x - 1, y + 0

if x * y = positive number -> steps = sum of absolute value of coordinates
if x * y = negative number -> steps = largest absolute value coordinate

*/

route.forEach(direction => {
    switch (direction) {
        case 'n' : y--; break;
        case 'ne': x++; y--; break;
        case 'se': x++; break;
        case 's' : y++; break;
        case 'sw': x--; y++; break;
        case 'nw': x--; break;
        default: break;
    }
    steps = (x * y > 0) ? Math.abs(x) + Math.abs(y)
        : (Math.abs(x) > Math.abs(y))
            ? Math.abs(x)
            : Math.abs(y);
    farthest = (steps > farthest) ? steps : farthest;
});

console.log('Child is at:', x + ',' + y);
console.log('Part 1 (Steps back):', steps);
console.log('Part 2 (Farthest steps):', farthest);