// Advent of Code - Day 23
// http://adventofcode.com/2017/day/23

var inputString = `set b 99
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`;

var registers = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 };

var input = inputString.split('\n')
    .map(line => {
        var parts = line.split(' ');
        if (!isNaN(parseInt(parts[1])))
            parts[1] = parseInt(parts[1]);
        if (!isNaN(parseInt(parts[2])))
            parts[2] = parseInt(parts[2]);
        return parts;
    });

function doInstruction(cmd, param1, param2) {
    var nextCmd = 1;
    var param1_val = (!isNaN(parseInt(param1))) ? param1 : registers[param1];
    var param2_val = (!isNaN(parseInt(param2))) ? param2 : registers[param2];

    switch(cmd) {
        case 'set': registers[param1] = param2_val;
                    break;
        case 'sub': registers[param1] -= param2_val;
                    break;
        case 'mul': registers[param1] *= param2_val;
                    mul_count++;
                    break;
        case 'jnz': if (param1_val != 0) { nextCmd = param2_val; }
                    break;
        default:    break;
    }
    return nextCmd;
}

var mul_count = 0;

for (var i = 0; i < input.length; ) {
    i += doInstruction(input[i][0], input[i][1], input[i][2]);
}

console.log('Part 1:', mul_count);

// Part 2

/* var registers = { a: 1, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 };

for (var i = 0; i < input.length;) {
    i += doInstruction(input[i][0], input[i][1], input[i][2]);
    console.log(registers);
    if (registers.h > 0) break;
} // This would take forever to complete!

console.log('Part 2:', registers.h); */

var input = +inputString.match(/\d+/)[0];

function optimize(c) {
    var h = 0;
    for (var b = c; b <= c + 17000; b += 17) {
        var d = 2;
        while (b % d !== 0) d++;
        if (b !== d) h++;
    }

    return h;
};
console.log('Part 2:', optimize(input * 100 + 100000));