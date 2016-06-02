'use strict';
const H = require('highland');
const fs = require('fs');

const readFile = H.wrapCallback(fs.readFile);
const wovels = ['a', 'e', 'i', 'o', 'u'];

let total = 0;

const badList = ['ab', 'cd', 'pq', 'xy']; // it does not contain ab, cd, pq, xy

// at least 3 wovels
const atLeast3wovels = (str) => {
	const chars = str.split('').filter(function(n) {
		return wovels.indexOf(n) != -1;
	});
	return chars.length >= 3;
};

// at least one letter twice in a row
const letterInARow = (str) => {
	return str.match(/(.)\1{1,}/)
};

H(['./input5'])
	.flatMap(readFile)
	.map(str => str.toString())
	.split()
	.reject(str => str.match(badList[0]))
	.reject(str => str.match(badList[1]))
	.reject(str => str.match(badList[2]))
	.reject(str => str.match(badList[3]))
	.filter(atLeast3wovels)
	.filter(letterInARow)
	.tap(str => {
		console.log(str);
		total++;
	})
	.done(() => {
		console.log(total);
	});