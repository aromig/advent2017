// Advent of Code 2017 - Day 4
// http://adventofcode.com/2017/day/4

var inputString = ``; // insert from day4_input.txt

inputString = '[\n[\'' + inputString.replace(/[^\S\n]/g, '\',\'').replace(/\n/g, '\'],\n[\'');
inputString = inputString + '\']\n]';

var input = eval(inputString);

// Part 1

var validPhrases = 0;
var words = [];

input.forEach(function(row) {
    words = [];
    for (var i = 0; i < row.length; i++) {
        if (words.indexOf(row[i]) > -1) {
            break;
        } else {
            words.push(row[i]);
        }
    }
    validPhrases += (row.length === words.length) ? 1 : 0;
});

console.log('Part 1: ' + validPhrases);

// Part 2

function isAnagram(phrase1, phrase2) {
    return phrase1.split("").sort().join("") === phrase2.split("").sort().join("");
}

validPhrases = 0;
var containsAnagram = false;

input.forEach(function (row) {
    words = [];
    containsAnagram = false;
    for (var i = 0; i < row.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (i != j) {
                if (isAnagram(row[i], row[j])) {
                    containsAnagram = true;
                }
            }
        }
        if (!containsAnagram) { words.push(row[i]); }
    }
    validPhrases += (row.length === words.length) ? 1 : 0;
});

console.log('Part 2: ' + validPhrases);