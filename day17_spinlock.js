var input = 301;

var buffer = [0], index = 0;

for (var i = 0; i <= 2017; i++) {
    index = (index + input) % (i + 1);
    buffer.splice(++index, 0, i + 1);
}

var result = buffer[buffer.indexOf(2017) + 1];

console.log('Part 1:', result);

index = 0;

for (var i = 0; i <= 50000000; i++) {
    index = (index + input + 1) % (i + 1);
    if (index == 0) {
        result = i + 1;
    }
}

console.log('Part 2:', result);