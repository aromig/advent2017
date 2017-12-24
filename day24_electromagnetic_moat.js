// Advent of Code 2017 - Day 24
// http://adventofcode.com/2017/day/24

var input = ``; // insert from day24_input.txt

// Part 1

var components = input.split('\n').map(x => x.split('/').map(x => parseInt(x)));
var possible_bridges = makeBridges({ strength: 0, chainLen: 0 }, components, 0);
var strongest_bridge = possible_bridges.sort((a, b) => b.strength - a.strength)[0];

console.log('Part 1:', strongest_bridge.strength);

// Part 2

var components = input.split('\n').map(x => x.split('/').map(x => parseInt(x)));
var possible_bridges = makeBridges({ strength: 0, chainLen: 0 }, components, 0);
var longest_length = possible_bridges.map(x => x.chainLen).sort((a, b) => b - a)[0];
var strongest_longest_bridge = possible_bridges
    .filter(x => x.chainLen === longest_length)
    .sort((a, b) => b.strength - a.strength)
    [0];

console.log('Part 2:', strongest_longest_bridge.strength);

function makeBridges(bridge, components, port) {
    var bridges = [];

    for (var i = 0; i < components.length; i++) {
        if (components[i][0] === port || components[i][1] === port) {
            var new_bridge = {
                strength: bridge.strength + components[i][0] + components[i][1],
                chainLen: bridge.chainLen + 1
            };
            bridges.push(new_bridge);

            var leftover_components = components.slice()
            leftover_components.splice(i, 1);

            var new_port = components[i][0] === port ? components[i][1] : components[i][0];

            bridges = bridges.concat(makeBridges(new_bridge, leftover_components, new_port));
        }
    }
    return bridges;
}