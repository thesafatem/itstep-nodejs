const http = require('http');

const students = [];

http.createServer((request, response) => {
	// console.log(request);
	// if (request.url == '/student') {
	// 	response.statusCode = 200;
	// 	response.end('<h1>Hello, student</h1>');
	// } else if (request.url == '/teacher') {
	// 	response.statusCode = 200;
	// 	response.end('<h1>Hello, teacher</h1>');
	// } else {
	// 	response.statusCode = 404;
	// 	response.end('<h1>Not found</h1>');
	// }
	if (request.method == 'POST') {
		students.push(request.url.slice(1));
		console.log(students);
		response.end('<h1>OK</h1>');
	}
}).listen(3000);
