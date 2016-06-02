'use strict';
const H = require('highland');
const _ = require('lodash');
const fs = require('fs');
const readFile = H.wrapCallback(fs.readFile);

let houses = {};

let x = 0;
let y = 0;
houses['0:0'] = 1;
H(['./input3'])
	.flatMap(readFile)
	.map(str => str.toString())
	.map(str => str.split(''))
	.flatMap(H)
	.tap(item => {
		switch(item) {
			case '^': y++; break;
			case 'v': y--; break;
			case '<': x--; break;
			case '>': x++; break;
		}
		const loc = `${x}:${y}`;
		if(houses[loc]) {
			houses[loc]++;
		} else {
			houses[loc] = 1;
		}
	})
	.done(() => {
		console.log(Object.keys(houses).length);
	});