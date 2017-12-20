// Advent of Code 2017 - Day 13
// http://adventofcode.com/2017/day/13

var inputString = ``; // insert from day13_input.txt

var layers = [];
var packet = severity = 0;

function setupLayers() {
    layers = [];
    var input = inputString
        .replace(/[^\S\n]/g, '')
        .split('\n')
        .forEach(line => {
            var p = line.split(':');
            var depth = parseInt(p[0]);
            var range = parseInt(p[1]);
            var scan = 0;
            var direction = 'd';

            layers[depth] = [];
            layers[depth]['range'] = range;
            layers[depth]['scan'] = scan;
            layers[depth]['direction'] = direction;
        });
}

function moveScanners(scanners) {
    scanners.forEach(scan => {
        switch (scan['direction']) {
            case 'd':
                if (scan['scan'] < scan['range'] - 1) {
                    scan['scan']++;
                } else {
                    scan['scan']--;
                    scan['direction'] = 'u';
                }
                break;
            case 'u':
                if (scan['scan'] > 0) {
                    scan['scan']--;
                } else {
                    scan['scan']++;
                    scan['direction'] = 'd';
                }
                break;
            default: break;
        }
    });
}

// Part 1

setupLayers();

for (var pos = 0; pos < layers.length; pos++) {
    if (layers[pos] != undefined) {
        if (packet === layers[pos]['scan']) {
            severity += pos * layers[pos]['range'];
        }
    }
    moveScanners(layers);
}
console.log('Part 1:', severity);

// Part 2

setupLayers();

var delay = 0;

for (var notCaught = true; notCaught; delay++) {
    notCaught = false;
    for (var i = 0; i < layers.length && !notCaught; i++) {
        if (layers[i] != undefined) {
            if (layers[i]['range'] > 0 && (delay + i) % (2 * layers[i]['range'] - 2) == 0) {
                notCaught = true;
            }
        }
    }
}

console.log('Part 2:', --delay);