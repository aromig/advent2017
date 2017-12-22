// Advent of Code - Day 21
// http://adventofcode.com/2017/day/21

var inputString = ``;

var initial_pattern = `.#.
..#
###`;

var pattern = initial_pattern.split('\n')
    .map(x => x.split(''));

var rulebook = inputString.split('\n');
var rules = [];

rulebook.forEach(line => {
    var parts = line.split(' => ');
    var input = parts[0].split('/').map(x => x.split(''));
    var output = parts[1].split('/').map(x => x.split(''));

    var split = rules[input.length];
    if (!split) {
        split = [];
        rules[input.length] = split;
    }

    var hashes = countHashes(input);
    var hash_counts = split[hashes];
    if (!hash_counts) {
        hash_counts = [];
        split[hashes] = hash_counts;
    }

    hash_counts.push({input: input, output: output});
});

//var iterations = 5; // Part 1
var iterations = 18; // Part 2

for (var i = 0; i < iterations; i++) {
    var mod = pattern.length % 2 == 0 ? 2 : 3;
    var num = pattern.length / mod;

    var new_pattern = new Array(num * (mod+1))
        .fill(undefined)
        .map(x => new Array(num * (mod+1))
            .fill('.'));
    
    for (var y = 0; y < num; y++) {
        for (var x = 0; x < num; x++) {
            var section = getSection(pattern, y * mod, x * mod, mod);
            var stamp = match(section, rules);
            stampPattern(new_pattern, stamp, y, x, mod + 1);
        }
    }
    pattern = new_pattern;
}

console.log(countHashes(pattern));

/* ***** FUNCTIONS ***** */

function countHashes(pattern) {
    var count = 0;
    for (var y = 0; y < pattern.length; y++) {
        for (var x = 0; x < pattern[y].length; x++) {
            if (pattern[y][x] == '#') {
                count++;
            }
        }
    }
    return count;
}

function getSection(pattern, sizeY, sizeX, size) {
    var p = [];
    for (var y = 0; y < size; y++) {
        p[y] = [];
        for (var x = 0; x < size; x++) {
            p[y][x] = pattern[sizeY + y][sizeX + x];
        }
    }
    return p;
}

function match(section, rules) {
    var possible_match = rules[section.length][countHashes(section)];
    for (var p of possible_match) {
        if (sectionMatch(section, p)) {
            return p.output;
        }
    }
}

function sectionMatch(section, rule) {
    var input = rule.input;

    for (var i = 0; i < 4; i++) {
        if (isMatch(section, input)) {
            return rule.output;
        }
        input = rotate(input);
    }

    input = flip(input);

    for (var i = 0; i < 4; i++) {
        if (isMatch(section, input)) {
            return rule.output;
        }
        input = rotate(input);
    }

    return null;
}

function isMatch(section, input) {
    for (var y = 0; y < section.length; y++) {
        for (var x = 0; x < section[y].length; x++) {
            if (section[y][x] != input[y][x]) {
                return false;
            }
        }
    }
    return true;
}

function stampPattern(pattern, stamp, sizeY, sizeX, size) {
    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
            pattern[sizeY * size + y][sizeX * size + x] = stamp[y][x];
        }
    }
}

function flip(section) {
    var new_section = [];

    for (var y = 0; y < section.length; y++) {
        new_section[y] = [];
        for (var x = 0; x < section[y].length; x++) {
            new_section[y][x] = section[y][section[y].length - x - 1];
        }
    }
    
    return new_section;
}

function rotate(section) {
    var new_section = [];

    for (var y =0; y < section.length; y++) {
        new_section[section.length - y - 1] = [];
        for (var x = 0; x < section[y].length; x++) {
            new_section[section.length - y - 1][x] = section[x][y];
        }
    }

    return new_section;
}