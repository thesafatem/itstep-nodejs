const express = require('express');

const posts = ['Hello', 'Bye'];

const router = express.Router();

router.get('/', (req, res) => {
	let html = '';
	posts.forEach((post) => {
		html += '<p>' + post + '</p>';
	});
	res.end(html);
});

module.exports = router;
