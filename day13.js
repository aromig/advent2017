var inputString = `0: 5
1: 2
2: 3
4: 4
6: 6
8: 4
10: 6
12: 10
14: 6
16: 8
18: 6
20: 9
22: 8
24: 8
26: 8
28: 12
30: 12
32: 8
34: 8
36: 12
38: 14
40: 12
42: 10
44: 14
46: 12
48: 12
50: 24
52: 14
54: 12
56: 12
58: 14
60: 12
62: 14
64: 12
66: 14
68: 14
72: 14
74: 14
80: 14
82: 14
86: 14
90: 18
92: 17`;

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