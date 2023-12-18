const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.end('Film!');
});

router.get('/:id', (req, res) => {
	res.end('Film ' + req.params.id);
});

router.post('/', (req, res) => {
	res.end('New film');
});

module.exports = router;
