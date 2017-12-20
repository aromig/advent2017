// Advent of Code - Day 20
// http://adventofcode.com/2017/day/20

var input = ``;

function initParticles(input) {
    return input.split('\n')
        .map(line => {
            var parts = line.split(', ');
            var p = eval('[' + parts[0].substr(3, parts[0].length-4) + ']');
                p = { 'x': p[0], 'y': p[1], 'z': p[2] }
            var v = eval('[' + parts[1].substr(3, parts[1].length - 4) + ']');
                v = { 'x': v[0], 'y': v[1], 'z': v[2] }
            var a = eval('[' + parts[2].substr(3, parts[2].length - 4) + ']');
                a = { 'x': a[0], 'y': a[1], 'z': a[2] }
            line = {
                'p': p,
                'v': v,
                'a': a,
                'dist': function() {
                    return Math.abs(p.x) + Math.abs(p.y) + Math.abs(p.z);
                }
            }
            return line;
        });
}

function updateParticle(particle) {
    particle.v.x += particle.a.x;
    particle.v.y += particle.a.y;
    particle.v.z += particle.a.z;

    particle.p.x += particle.v.x;
    particle.p.y += particle.v.y;
    particle.p.z += particle.v.z;

    return particle;
}

var particles = initParticles(input);
var ticks = 1000;
var distances = [];

// Part 1

while (ticks--) {
    particles.forEach((particle, idx) => {
        particle = updateParticle(particle)
        distances[idx] = particle.dist();
    });
}
var closest = distances.indexOf(Math.min.apply(null, distances));

console.log('Part 1:', closest);

// Part 2

var particles = initParticles(input);
var ticks = 1000;

while (ticks--) {
    var seen = [];

    particles.forEach((particle, idx) => {
        particle = updateParticle(particle);
        seen.push(particle.p.x + ',' + particle.p.y + ',' + particle.p.z);
    });

    seen.forEach((value, idx) => {
        var match = seen.indexOf(value);
        if (match != idx) { // remove collisions
            particles[match] = null;
            particles[idx] = null;
        }
    });

    particles = particles.filter(p => p != null);
}

console.log('Part 2:', particles.length);