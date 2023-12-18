const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		login: {
			type: DataTypes.STRING,
		},
		age: {
			type: DataTypes.INTEGER,
		},
	},
	{
		timestamps: false,
		modelName: 'users',
	},
);

module.exports = User;
