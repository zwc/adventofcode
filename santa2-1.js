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
		const l = dimensions[0];
		const w = dimensions[1];
		const h = dimensions[2];
		const slack = [
			(l*w),
			(w*h),
			(h*l)
		];
		const sides = [
			(2*l*w),
			(2*w*h),
			(2*h*l)
		];
		const area = _.sum(sides) + _.min(slack);
		total += area;
	})
	.done(() => {
		console.log(total);
	});