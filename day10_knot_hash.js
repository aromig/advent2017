// Advent of Code 2017 - Day 10
// http://adventofcode.com/2017/day/10

var input = `227,169,3,166,246,201,0,47,1,255,2,254,96,3,97,144`;

var elements = input.split(',');
elements = elements.map(x => parseInt(x));

// Part 1

var pos = skip = 0;

var list = [];
var listLen = 256;

for (var i = 0; i < listLen; i++) {
    list.push(i);
}

elements.forEach(el => {
    var n = [];
    for (var i = 0; i < el; i++) {
        n.push(list[(pos + i) % listLen]);
    }
    for (var i = el - 1; i >= 0; i--) {
        list[(pos + i) % listLen] = n[el - i - 1];
    }
    pos += (el + skip++);
});

console.log('Part 1:', list[0] * list[1]);

// Part 2

elements = [];
for (var i = 0; i < input.length; i++) {
    elements.push(input.charCodeAt(i));
}
elements = elements.concat([17, 31, 73, 47, 23]);

var pos = skip = 0;

var list = [];

for (var i = 0; i < listLen; i++) {
    list.push(i);
}

// sparse hash
for (var iterate = 0; iterate < 64; iterate++) {
    elements.forEach(el => {
        var n = [];
        for (var i = 0; i < el; i++) {
            n.push(list[(pos + i) % listLen]);
        }
        for (var i = el - 1; i >= 0; i--) {
            list[(pos + i) % listLen] = n[el - i - 1];
        }
        pos += (el + skip++);
    });
}

// dense hash
var dense = [];
for (var i = 0; i < listLen; i += 16) {
    var foo = 0;
    for (var j = i; j < i + 16; j++) {
        foo = foo ^ list[j];
    }
    dense.push(foo);
}

var hash = [];
dense.forEach(n => {
    var hex = n.toString(16);
    if (hex.length == 1) {
        hex = "0" + hex;
    }
    hash.push(hex);
});

console.log('Part 2', hash.join(""));