'use strict';
const H = require('highland');
const _ = require('lodash');
const fs = require('fs');
const readFile = H.wrapCallback(fs.readFile);

let total = 0;
H(['./input2'])
	.flatMap(readFile)
	.map(str => str.toString())
	.split()
	.tap(item => {
		const dimensions = item.split('x');
		const l = parseInt(dimensions[0]);
		const w = parseInt(dimensions[1]);
		const h = parseInt(dimensions[2]);
		const bow = l*w*h;
		const sides = [l, w, h];
		const short = sides.sort(function(a,b){return a - b});
		const length = (short[0] * 2) + (short[1] * 2) + bow;
		//console.log(length);
		total += length;
	})
	.done(() => {
		console.log(total);
	});