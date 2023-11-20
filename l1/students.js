const events = require('events');
const myEmitter = new events.EventEmitter();

const students = [];

myEmitter.addListener('Add student', (name) => {
	students.push({
		name: name,
		marks: [],
	});
});

myEmitter.addListener('Add mark', (name, mark) => {
	students.forEach((student) => {
		if (student.name == name) {
			student.marks.push(mark);
		}
	});
	myEmitter.emit('Get mean', name);
});

myEmitter.addListener('Get mean', (name) => {
	students.forEach((student) => {
		if (student.name == name) {
			let sum = 0;
			student.marks.forEach((mark) => {
				sum += mark;
			});
			if (student.marks.length == 0) {
				console.log('-');
			} else {
				console.log(sum / student.marks.length);
			}
		}
	});
});

myEmitter.emit('Add student', 'Polina');
myEmitter.emit('Add student', 'Timur');
myEmitter.emit('Add student', 'Dimash 1');
myEmitter.emit('Add student', 'Roman');
console.log(students);

myEmitter.emit('Add mark', 'Timur', 5);
myEmitter.emit('Add mark', 'Timur', 4);
myEmitter.emit('Add mark', 'Roman', 5);
myEmitter.emit('Add mark', 'Dimash 1', 3);
console.log(students);
