const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.json({
		message: 'Test Case Generator',
	});
});

router.post('/random/array', (req, res) => {
	const n = req.body.arrSize;

	res.json({
		array: Array.from({ length: n }, () => Math.floor(Math.random() * n)),
	});
});

module.exports = router;
