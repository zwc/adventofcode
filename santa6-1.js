'use strict';
const H = require('highland');
const fs = require('fs');
const _ = require('lodash');

const readFile = H.wrapCallback(fs.readFile);

const getCoords = (str) => {
	const split = str.split(',');
	return [parseInt(split[0]), parseInt(split[1])];
};

const parse = (str) => {
	const parts = str.split(' ');
	if(str.match(/turn on/)) {
		return { operation: 'on', nw: getCoords(parts[2]), se: getCoords(parts[4]) }
	}
	if(str.match(/turn off/)) {
		return { operation: 'off', nw: getCoords(parts[2]), se: getCoords(parts[4]) }
	}
	if(str.match(/toggle/)) {
		return { operation: 'toggle', nw: getCoords(parts[1]), se: getCoords(parts[3]) }
	}
};

const toggle = (instr) => {
	switch(instr.operation) {
		case 'on':
			for(let x = instr.nw[0]; x <= instr.se[0]; x++) {
				for(let y = instr.nw[1]; y <= instr.se[1]; y++) {
					lights[`${x}:${y}`] = 1;
				}
			}
			break;
		case 'off':
			for(let x = instr.nw[0]; x <= instr.se[0]; x++) {
				for(let y = instr.nw[1]; y <= instr.se[1]; y++) {
					lights[`${x}:${y}`] = 0;
				}
			}
			break;
		case 'toggle':
			for(let x = instr.nw[0]; x <= instr.se[0]; x++) {
				for(let y = instr.nw[1]; y <= instr.se[1]; y++) {
					if(!lights[`${x}:${y}`] || lights[`${x}:${y}`] === 0) {
						lights[`${x}:${y}`] = 1;
					} else {
						lights[`${x}:${y}`] = 0;
					}
				}
			}
			break;
	}
};

const mustBeOn = (light) => { return light === 1; };

let lights = {};
H(['./input6'])
	.flatMap(readFile)
	.map(stream => stream.toString())
	.split()
	.map(parse)
	.tap(toggle)
	.tap(H.log)
	.done(() => {
		console.log(_.filter(lights, mustBeOn).length);
	});
