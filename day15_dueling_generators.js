var gen_A = 783, gen_B = 325;
var factor_A = 16807, factor_B = 48271, divisor = 2147483647;
var pairs = 40000000, total = 0;

function nextValue(value, factor, div) {
    do {
        value = value * factor % divisor;
    } while (value % div);

    return value;
}

// Part 1

for (var i = 0; i < pairs; i++) {
    gen_A = nextValue(gen_A, factor_A, 1);
    gen_B = nextValue(gen_B, factor_B, 1);
    
    total += (gen_A & 0xFFFF) == (gen_B & 0xFFFF);
}

console.log('Part 1:', total);

// Part 2

gen_A = 783; gen_B = 325;
pairs = 5000000; total = 0;

for (var i = 0; i < pairs; i++) {
    gen_A = nextValue(gen_A, factor_A, 4);
    gen_B = nextValue(gen_B, factor_B, 8);

    total += (gen_A & 0xFFFF) == (gen_B & 0xFFFF);
}

console.log('Part 2:', total);