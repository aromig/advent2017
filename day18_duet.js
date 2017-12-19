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

function doInstruction(cmd, register, val) {
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

var reg_0 = {};
var reg_1 = {};

var input = inputString.split('\n')
                        .map(line => {
                            var parts = line.split(' ');
                            if (parts[0] != 'snd' && parts[0] != 'rcv') {
                                parts[2] = (!isNaN(parseInt(parts[2]))) ? parseInt(parts[2]) : parts[2];
                            }
                            if (isNaN(parseInt(parts[1]))) {
                                reg_0[parts[1]] = null;
                                reg_1[parts[1]] = null;
                            }
                            return parts;
                        });

reg_0['p'] = 0;
reg_1['p'] = 1;

var queue_0 = [];
var queue_1 = [];
var send = 0;

function doInstruction2(program, reg, cmd, register, val) {
    var nextCmd = 1;

    var real_val = (!isNaN(parseInt(val))) ? val : reg[val];
    var real_reg_val = (!isNaN(parseInt(val))) ? val : reg[register];

    switch(cmd) {
        case 'set': reg[register] = real_val;
                    break;
        case 'add': reg[register] += real_val;
                    break;
        case 'mul': reg[register] *= real_val;
                    break;
        case 'mod': reg[register] = reg[register] % real_val;
                    break;
        case 'jgz': var num = isNaN(parseInt(register)) ? reg[register] : register;
                    if (num > 0)
                        nextCmd = real_val;
                    break;
        case 'snd': if (program == 0) {
                        queue_1.push(real_reg_val);
                    } else {
                        queue_0.push(real_reg_val);
                        send++;
                    }
                    break;
        case 'rcv': if (program == 0) {
                        if (queue_0.length > 0) {
                            reg[register] = queue_0[0];
                            queue_0 = queue_0.slice(1);
                            nextCmd = 1;
                        } else {
                            nextCmd = 0;
                        }
                    } else {
                        if (queue_1.length > 0) {
                            reg[register] = queue_1[0];
                            queue_1 = queue_1.slice(1);
                            nextcmd = 1;
                        } else {
                            nextCmd = 0;
                        }
                    }
                    break;
        default:    break;
    }

    return nextCmd;
}

var step_0 = step_1 = 0;

do {
    var next_0 = doInstruction2(0, reg_0, input[step_0][0], input[step_0][1], input[step_0][2]);
    var next_1 = doInstruction2(1, reg_1, input[step_1][0], input[step_1][1], input[step_1][2]);

    step_0 += next_0;
    step_1 += next_1;
} while (!(next_0 == 0 && next_1 == 0));

console.log('Part 2:', send);