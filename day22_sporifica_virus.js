// Advent of Code - Day 22
// http://adventofcode.com/2017/day/22

var input = `.....###..#....#.#..##...
......##.##...........##.
.#..#..#.#.##.##.........
...#..###..##.#.###.#.#.#
##....#.##.#..####.####..
#..##...#.##.##.....##..#
.#.#......#...####...#.##
###....#######...#####.#.
##..#.####...#.#.##......
##.....###....#.#..#.##.#
.#..##.....#########.##..
##...##.###..#.#..#.#...#
...####..#...#.##.#..####
.#..##......#####..#.###.
...#.#.#..##...#####.....
#..###.###.#.....#.#.###.
##.##.#.#.##.#..#..######
####.##..#.###.#...#..###
.........#####.##.###..##
..#.##.#..#..#...##..#...
###.###.#.#..##...###....
##..#.#.#.#.#.#.#...###..
#..#.#.....#..#..#..##...
........#######.#...#.#..
..##.###.#.##.#.#.###..##`;

var grid = input.split('\n').map(x => x.split(''));
grid = expandGrid(grid, 5000, 5001);

var carrier = {
    x: Math.floor(grid[0].length / 2),
    y: Math.floor(grid.length / 2),
    facing: 'up',
    infected: 0
}

var bursts = 10000;
for (var i = 0; i < bursts; i++) {
    burst();
}

console.log('Part 1');
console.log(carrier);

var grid = input.split('\n').map(x => x.split(''));
grid = expandGrid(grid, 5000, 5001);

var carrier = {
    x: Math.floor(grid[0].length / 2),
    y: Math.floor(grid.length / 2),
    facing: 'up',
    infected: 0
}

var bursts_p2 = 10000000;
for (var i = 0; i < bursts_p2; i++) {
    burst_p2();
}

console.log('Part 2');
console.log(carrier);

/* ***** FUNCTIONS ***** */

function expandGrid(old_grid, rows, columns) {
    var old_width = old_grid[0].length, old_length = old_grid.length;
    var new_width = old_width + columns, new_length = old_length + rows;
    var new_grid = [];

    for (var y = 0; y < new_length; y++) {
        new_grid[y] = [];
        for (var x = 0; x < new_width; x++) {
            new_grid[y][x] = '.';
        }
    }

    var insert_y = Math.ceil(rows / 2);
    var insert_x = Math.ceil(columns / 2);

    for (var y = insert_y; y < old_length + insert_y; y++) {
        for (var x = insert_x; x < old_width + insert_x; x++) {
            new_grid[y][x] = old_grid[y - insert_y][x - insert_x];
        }
    }

    return new_grid;
}

function burst() {
    var node = grid[carrier.y][carrier.x];
    // change facing
    switch (carrier.facing) {
        case 'up'   :   carrier.facing = node == '#' ? 'right' : 'left'; break;
        case 'right':   carrier.facing = node == '#' ? 'down'  : 'up'; break;
        case 'down' :   carrier.facing = node == '#' ? 'left'  : 'right'; break;
        case 'left' :   carrier.facing = node == '#' ? 'up'    : 'down'; break;
    }
    // change infection status
    if (node == '.') {
        grid[carrier.y][carrier.x] = '#';
        carrier.infected++;
    } else {
        grid[carrier.y][carrier.x] = '.';
    }
    // move forward
    switch (carrier.facing) {
        case 'up'   :   carrier.y--; break;
        case 'right':   carrier.x++; break;
        case 'down' :   carrier.y++; break;
        case 'left' :   carrier.x--; break;
    }
}

function burst_p2() {
    var node = grid[carrier.y][carrier.x];
    // change facing
    if (node == '.') {
        switch (carrier.facing) {
            case 'up'   :   carrier.facing = 'left'; break;
            case 'right':   carrier.facing = 'up'; break;
            case 'down' :   carrier.facing = 'right'; break;
            case 'left' :   carrier.facing = 'down'; break;
        }
    } else if (node == '#') {
        switch (carrier.facing) {
            case 'up'   :   carrier.facing = 'right'; break;
            case 'right':   carrier.facing = 'down'; break;
            case 'down' :   carrier.facing = 'left'; break;
            case 'left' :   carrier.facing = 'up'; break;
        }
    } else if (node == 'F') {
        switch (carrier.facing) {
            case 'up'   :   carrier.facing = 'down'; break;
            case 'right':   carrier.facing = 'left'; break;
            case 'down' :   carrier.facing = 'up'; break;
            case 'left' :   carrier.facing = 'right'; break;
        }
    }
    // change infection status
    switch (node) {
        case '.'    :   grid[carrier.y][carrier.x] = 'W'; break;
        case 'W'    :   grid[carrier.y][carrier.x] = '#'; carrier.infected++; break;
        case '#'    :   grid[carrier.y][carrier.x] = 'F'; break;
        case 'F'    :   grid[carrier.y][carrier.x] = '.'; break;
    }
    // move forward
    switch (carrier.facing) {
        case 'up'   :   carrier.y--; break;
        case 'right':   carrier.x++; break;
        case 'down' :   carrier.y++; break;
        case 'left' :   carrier.x--; break;
    }
}