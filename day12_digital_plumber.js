// Advent of Code 2017 - Day 12
// http://adventofcode.com/2017/day/12

var input = ``; // insert from day12_input.txt

var programs = input.replace(/[^\S\n]/g, '')
                    .split('\n')
                    .map(p => p.trim())
                    .filter(p => !!p)
                    .reduce((map, p) => {
                        var parts = p.split("<->");
                        map[parts[0]] = parts[1].split(",");
                        return map;
                    }, {});

function connected(programs, program, current = new Set()) {
    current.add(program);
    for (var p of programs[program].filter(p => !current.has(p))) {
        connected(programs, p, current);
    }
    return current;
}

// Part 1

var connectedToZero = connected(programs, "0");

// Part 2

var groups = Object.keys(programs).map(p => connected(programs, p));
groups = new Set(groups.map(g => Array.from(g))
               .map(g => g.sort((a,b) => a.localeCompare(b)))
               .map(g => JSON.stringify(g)));

console.log('Part 1:', connectedToZero.size);
console.log('Part 2:', groups.size);