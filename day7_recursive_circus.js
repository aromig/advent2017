// Advent of Code 2017 - Day 7
// http://adventofcode.com/2017/day/7

var input = ``; // insert from day7_input.txt

const regex = /(\w+) \((\d+)\)( -> ([\w, ]+))?/;

// Part 1

var nodes = input.split('\n').map(x => regex.exec(x));
var map = [];

nodes.forEach(x => (map[x[1]] = true));

nodes.forEach(x => {
    if (x[4]) {
        x[4].split(', ').forEach(k => delete map[k])
    }
});

for (var key in map)
    var root = key;
console.log('Part 1:', root);

// Part 2

var nodes = input.split('\n').map(x => regex.exec(x));
var map = [];

nodes.forEach(x =>
    (map[x[1]] = {
        id: x[1],
        weight: Number(x[2]),
        children: x[4] ? x[4].split(', ') : null,
        sum: function() {
            return (this.weight +
                (this.children ? this.children.reduce((p, c) => {
                    return p + map[c].sum()
                }
                , 0)
            : 0))
        }
    })
);

var rootID = map[root];
var wrongChild = [];
wrongChild = getWrongChild(rootID, rootID.weight);

var wrong_node = wrongChild[0], target_weight = wrongChild[1];
    // console.log('wrong_node:', wrong_node);
    // console.log('target weight:', target_weight);
    // console.log('wrong_node sum:', wrong_node.sum());
var diff = wrong_node.sum() - target_weight;
    // console.log('difference:', diff);

console.log('Part 2:', wrong_node.weight - diff);

function getWrongChild(node, targetWeight) {
    if (!node.children) {
        return [node, targetWeight];
    }
    
    var tree = [];
    node.children.forEach(child => {
        var sum = map[child].sum();
        // console.log(map[child], sum);
        if (tree[sum]) {
            tree[sum].count++;
        } else {
            tree[sum] = { node: child, count: 1 }
        }
    });

    var unbalanced = null, weight = -1;

    for (var sum in tree) {
        if (tree[sum].count === 1) {
            unbalanced = tree[sum].node;
        } else {
            weight = Number(sum);
        }
    }
    // console.log('unbalanced:', unbalanced);
    if (unbalanced === null) {
        return [node, targetWeight];
    }
    
    return getWrongChild(map[unbalanced], weight);
}