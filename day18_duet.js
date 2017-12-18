var inputString = `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 952
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`;

// Part 1

var registers = {};
var input = inputString.split('\n')
                        .map(line => {
                            var parts = line.split(' ');
                            if (parts[0] != 'snd' && parts[0] != 'rcv') {
                                parts[2] = (!isNaN(parseInt(parts[2]))) ? parseInt(parts[2]) : parts[2];
                            }
                            if (parts[0] == 'set') {
                                registers[parts[1]] = null;
                            }
                            return parts;
                        });

var played = [];
var recovered = null;

function doInstruction(cmd, register, val = null) {
    var nextCmd = 1;
    var real_val = (!isNaN(parseInt(val))) ? val : registers[val];

    switch (cmd) {
        case 'snd': played.push(registers[register]);
                    break;
        case 'set': registers[register] = real_val;
                    break;  
        case 'add': registers[register] += real_val;
                    break;
        case 'mul': registers[register] *= real_val;
                    break;
        case 'mod': registers[register] = registers[register] % real_val;
                    break;
        case 'rcv': if (registers[register] != 0) {
                        recovered = played[played.length - 1];
                    }
                    break;
        case 'jgz': var num = isNaN(parseInt(register)) ? registers[register] : register;
                    if (num > 0)
                        nextCmd = real_val;
                    break;
        default:    break;
    }
    return nextCmd;
}

var step = 0;

do {
    step += doInstruction(input[step][0], input[step][1], input[step][2]);
} while (recovered == null);

console.log('Part 1:', recovered);

// Part 2

