const User = require('./repositories/user');

const user = User.create('Amir', 'Amirka123', 20).then((x) => {
	console.log(x);
});

console.log(user);
