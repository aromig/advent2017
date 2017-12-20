// Advent of Code 2017 - Day 16
// http://adventofcode.com/2017/day/16

var input = ''; // insert from day16_input.txt

var moves = input.split(',');
var original_order = 'abcdefghijklmnop';

String.prototype.replaceCharAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}

function dance(order, moves, times) {
    for (var iterate = 0; iterate < times; iterate++) {
        for (var i = 0; i < moves.length; i++) {
            switch (moves[i][0]) {
                case 's':   var spin = parseInt(moves[i].replace(/\D/g, ''));
                            var slice = order.length - spin;
                            order = order.slice(slice) + order.substr(0, slice);
                            break;
                case 'x':   var swap = moves[i].substr(1).split('/').map(x => parseInt(x));
                            var swap_1 = order[swap[0]], swap_2 = order[swap[1]];
                            order = order.replaceCharAt(swap[0], swap_2);
                            order = order.replaceCharAt(swap[1], swap_1);
                            break;
                case 'p':   var swap = moves[i].substr(1).split('/');
                            var swap_1 = order.indexOf(swap[0]), swap_2 = order.indexOf(swap[1]);
                            order = order.replaceCharAt(swap_1, swap[1]);
                            order = order.replaceCharAt(swap_2, swap[0]);
                            break;
                default:    break;
            }
        }
        if (order === original_order) {
            // finds how many cycles it takes to match the original order
            // then bumps iterate to where it would be having this match a lot closer to the end
            iterate += (Math.floor(times / (iterate + 1)) - 1) * (iterate + 1);
        }
    }
    return order;
}
// console.time('one');
console.log('Part 1:', dance(original_order, moves, 1));
// console.timeEnd('one'); // ~45ms
// console.time('billion');
console.log('Part 2:', dance(original_order, moves, 1000000000));
// console.timeEnd('billion'); // ~1600ms