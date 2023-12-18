const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.end('Director!');
});

router.get('/:id', (req, res) => {
	res.end('Director ' + req.params.id);
});

router.post('/', (req, res) => {
	res.end('New director');
});

module.exports = router;
