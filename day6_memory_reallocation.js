// Advent of Code 2017 - Day 6
// http://adventofcode.com/2017/day/6

var inputString = '5	1	10	0	1	7	13	14	3	12	8	10	7	12	0	6';

inputString = '[' + inputString.replace(/\t/g, ',') + ']';

var memory = eval(inputString);

var largestBank, distrib, remainder, distributedBanks;
var redistribs = 0;
var uniqueBank = true;
var memoryHistory = [];

memoryHistory.push(JSON.stringify(memory));

function FindDuplicate(current, history) {
    for (var i = 0; i < history.length; i++) {
        if (JSON.stringify(current) === history[i]) {
            return true;
        }
    }
    return false;
}
while (uniqueBank) {
    largestBank = memory.indexOf(Math.max(...memory));
    distributedBanks = memory.length - 1;

    distrib = memory[largestBank] / distributedBanks;
    remainder = memory[largestBank] % distributedBanks;
    if (distrib < 1) {
        distrib = 1;
        distributedBanks = memory[largestBank];
        remainder = 0;
    } else {
        distrib = Math.floor(distrib);
    }
/* console.log(memory);
console.log('largest number is ' + memory[largestBank]);
console.log('distributing ' + distrib + ' between ' + distributedBanks + ' banks');
console.log('remainder of ' + remainder + ' goes back to index ' + largestBank); */
    
    memory[largestBank] = remainder;

    var currentBank = largestBank + 1;
    while (distributedBanks > 0) {
        if (currentBank < memory.length) {
            memory[currentBank] += distrib;
            distributedBanks--;
            currentBank++;
        } else {
            currentBank = 0;
        }
    }

    uniqueBank = !(FindDuplicate(memory, memoryHistory));
    memoryHistory.push(JSON.stringify(memory));
    redistribs++;
}

var size = memoryHistory.length - 1 - memoryHistory.indexOf(JSON.stringify(memory));

console.log('Part 1: ' + redistribs);
console.log('Part 2: ' + size);