const area = (a, b) => {
	return a * b;
};

const perimeter = (a, b) => {
	return 2 * (a + b);
};

module.exports = {
	x: perimeter,
	y: area,
};
