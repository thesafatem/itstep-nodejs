const events = require('events');

const myEmitter = new events.EventEmitter();

myEmitter.addListener('press button', function () {
	console.log('Button is pressed');
});

// myEmitter.emit('press button');

// myEmitter.addListener('echo', (word) => {
// 	console.log(word);
// });

// myEmitter.emit('echo', 'Bye!');

// myEmitter.addListener('calculate', (a, b) => {
// 	console.log(a + b);
// });

// myEmitter.emit('calculate', 3, 5);
// myEmitter.emit('calculate', 3, 5);

// myEmitter.emit('event');

let x = 0;

// myEmitter.once('add', () => {
// 	x += 1;
// 	console.log(x);
// });

// myEmitter.emit('add');
// myEmitter.emit('add');

myEmitter.addListener('a', () => {
	console.log('event happened');
});

myEmitter.addListener('a', () => {
	x += 1;
	console.log(x);
});

myEmitter.emit('a');
myEmitter.emit('a');

// { name: 'Temir', marks: [1, 2, 3]};

students = [];

myEmitter.addListener('Add student', (name) => {
	students.push({
		name: name,
		marks: [],
	});
});

myEmitter.emit('Add student', 'Polina');
console.log(students);
