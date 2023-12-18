const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const app = express();
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
	res.render('hello.hbs');
});

app.post('/:student', (req, res) => {
	try {
		let students = fs.readFileSync('students.txt', 'utf8');
		const student = req.params.student;
		if (students == '') {
			students += student;
		} else {
			students += ',' + student;
		}
		fs.writeFileSync('students.txt', students);
		res.end('OK!');
	} catch (e) {
		console.log(e);
		res.statusCode = 400;
		res.end(e);
	}
});

app.get('/:id', (req, res) => {
	try {
		const id = req.params.id;
		let students = fs.readFileSync('students.txt', 'utf8');
		const studentsArray = students.split(',');
		res.end(studentsArray[id]);
	} catch (e) {}
});

app.delete('/:student', (req, res) => {
	try {
		const student = req.params.student;
		let students = fs.readFileSync('students.txt', 'utf8');
		const studentsArray = students.split(',');
		const filteredArray = studentsArray.filter((student_) => {
			return student_ != student;
		});
		const newStudents = filteredArray.join(',');
		fs.writeFileSync('students.txt', newStudents);
		res.end('OK!');
	} catch (e) {}
});

app.listen(3000);
