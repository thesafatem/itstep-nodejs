// const events = require('events');

const a = [1, 2, 3, 4, 5];

// [{number: 1}, {number: 2}, {number: 3}]

// {
// 	number: 2
// }

let sum = 0;

// for (let i = 0; i < a.length; i++) {
// 	a[i] *= 2;
// }

const b = a.map((element) => {
	return {
		number: element,
	};
});

a.forEach((element) => {
	console.log(element);
});

console.log(a, b);
