const express = require('express');

const users = ['Amir', 'Roman', 'Polina'];

const router = express.Router();

router.get('/', (req, res) => {
	// localhost:3000/users?filter=i
	// только пользователи с буквой i в имени
	const filter = req.query.filter;
	let filteredUsers = users;
	if (filter) {
		filteredUsers = users.filter((user) => {
			return user.includes(filter);
		});
	}
	let html = '';
	filteredUsers.forEach((user) => {
		html += '<p>' + user + '</p>';
	});
	res.end(html);
});

const middleware = (req, res, next) => {
	const id = req.params.id;
	if (id >= users.length) {
		res.statusCode = 404;
		res.end('<h1>No such user</h1>');
	} else {
		next();
	}
};

router.get('/:id', middleware, (req, res) => {
	const id = req.params.id;
	res.end(`<h1>${users[id]}</h1>`);
});

const bodyParser = require('body-parser');

router.post('/', bodyParser.json(), (req, res) => {
	const name = req.body?.name;
	if (!name) {
		res.statusCode = 400;
		res.end('<h1>Name is not provided</h1>');
	} else {
		users.push(name);
		res.statusCode = 201;
		res.end('<h1>User is created</h1>');
	}
});

module.exports = router;
