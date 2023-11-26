const fs = require('fs');

// try {
// 	fs.mkdirSync('folder1');
// } catch (e) {
// 	console.log(e);
// }

// fs.mkdir('folder1', (error) => {
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log('Folder is created!');
// 	}
// });

// try {
// 	fs.writeFileSync('hello.txt', 'hello, world!');
// } catch (e) {
// 	console.log(e);
// }

// fs.writeFile('hello.txt', 'hello, world!', (error) => {
// 	if (error) {
// 		console.log(error);
// 	}
// });

// fs.appendFile('hello.txt', 'hello, world!', (error) => {
// 	if (error) {
// 		console.log(error);
// 	}
// });

// try {
// 	const content = fs.readFileSync('hello.txt');
// 	console.log(content);
// } catch (e) {
// 	console.log(e);
// }

// fs.readFile('hello.txt', 'utf8', (error, content) => {
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log(content);
// 	}
// });

// try {
// 	fs.unlinkSync('hello.txt');
// } catch (e) {
// 	console.log(e);
// }

// fs.rm('folder1', { recursive: true }, (error) => {
// 	if (error) {
// 		console.log(error);
// 	}
// });

const path = require('path');
const myPath = path.join('folder1', 'folder2', 'hello.txt');
console.log(myPath);
fs.readFile(myPath, 'utf8', (error, content) => {
	if (error) {
		console.log(error);
	} else {
		console.log(content);
		fs.writeFile('hello2.txt', content, (error) => {
			if (error) {
				console.log(error);
			} else {
				console.log('Hello2.txt created');
			}
		});
	}
});

// let myPath = path.join('folder1', 'folder2');
// console.log(myPath);
// myPath = path.join(myPath, '..');
// console.log(myPath);

const { EventEmitter } = require('events');
// const EventEmitter = require('events').EventEmitter;
// const fs = require('fs');

const myEmitter = new EventEmitter();

myEmitter.addListener('create file', (name, text) => {
	fs.writeFile(name, text, (error) => {
		
	})
});


