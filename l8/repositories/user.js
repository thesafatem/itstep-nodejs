const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const User = require('../db/models/user');

const create = async (name, login, age) => {
	const user = await User.create({
		name,
		login,
		age,
	});

	return user;
};

const get = async () => {
	const users = await User.findAll();
	return users;
};

module.exports = {
	create,
	get,
};
