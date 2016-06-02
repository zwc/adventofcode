'use strict';
const H = require('highland');
const _ = require('lodash');
const fs = require('fs');
const readFile = H.wrapCallback(fs.readFile);

let houses = {};

let santa = [0, 0];
let robo = [0, 0];

houses['0:0'] = 1;
let santasTurn = true;
H(['./input3'])
	.flatMap(readFile)
	.map(str => str.toString())
	.map(str => str.split(''))
	.flatMap(H)
	.tap(item => {
		let current = santa;
		if(!santasTurn) {
			current = robo;
		}
		santasTurn = !santasTurn;
		switch(item) {
			case '^': current[1]++; break;
			case 'v': current[1]--; break;
			case '<': current[0]--; break;
			case '>': current[0]++; break;
		}
		const loc = `${current[0]}:${current[1]}`;
		if(houses[loc]) {
			houses[loc]++;
		} else {
			houses[loc] = 1;
		}
	})
	.done(() => {
		console.log(Object.keys(houses).length);
	});