'use strict';
const H = require('highland');
const md5 = require('md5');
const secret = 'bgvyzdsv';

let iterator = 0;
let found = false;
const generator = H(function (push, next) {
	if(!found) {
		push(null, iterator++);
		next();
	} else {
		push(null, H.nil);
	}
});

H(generator)
	.map(num => secret + num)
	.map(str => md5(str))
	.map(str => str.substr(0, 5))
	.filter(str => str === '00000')
	.tap(item => {
		found = true;
	})
	.done(() => {
		console.log(iterator - 1);
	});