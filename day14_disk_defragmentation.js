var input = 'vbqugkhl';
var bits = 128;
var hash = [];

function knotHash(input) {
    var elements = [];
    var listLen = 256;
    for (var i = 0; i < input.length; i++) {
        elements.push(input.charCodeAt(i));
    }
    elements = elements.concat([17, 31, 73, 47, 23]);

    var pos = skip = 0;
    var list = [];

    for (var i = 0; i < listLen; i++) {
        list.push(i);
    }

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
    
    return hash.join("");
}

function hex2bin(input) {
    var bin = parseInt(input, 16).toString(2);
    return "0000".slice(bin.length) + bin;
}

for (var i = 0; i < bits; i++) {
    var inputString = input + '-' + i;
    hash.push(knotHash(inputString));
}

var bitHash = [];
for (var i = 0; i < bits; i++) {
    var line = '';
    for (j = 0; j < hash[i].length; j++) {
        line += hex2bin(hash[i][j]);
    }
    bitHash.push(line);    
}

// Part 1

var used = 0;

bitHash.forEach(line => {
    for (var i = 0; i < line.length; i++) {
        used += (line[i] == '1' ? 1 : 0);
    }
});

console.log('Part 1:', used);

