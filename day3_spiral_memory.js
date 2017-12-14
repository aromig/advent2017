// Part 1

var n = 265149;
var x = 0;
var y = 0;
var count = 0;
var distance;

for (var i = 0; i < n; ++i) {
    if (count + 1 == n) {
        distance = Math.abs(x) + Math.abs(y);
    }
    if (Math.abs(x) <= Math.abs(y) &&  (x != y || x >= 0)) {
        x += ((y >= 0) ? 1 : -1);
    } else {
        y += ((x >= 0) ? -1 : 1);
    }
    count++;
}

console.log(distance);
