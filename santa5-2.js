'use strict';
const H = require('highland');
const fs = require('fs');
const readFile = H.wrapCallback(fs.readFile);

const letterBetween = (str) => {
	for(let i=1; i<str.length; i++) {
		if(str[i-1] === str[i+1]) {
			return true;
		}
	}
};

const twoPairs = (str) => {
	return str.match(/\b\w*?(\w{2})\w*?\1\w*?\b/g);
};

let count = 0;
H(['./input5'])
	.flatMap(readFile)
	.map(stream => stream.toString())
	.split()
	.filter(letterBetween)
	.filter(twoPairs)
	.tap(() => count++)
	.done(() => {
		console.log(`${count} nice strings`);
	});
