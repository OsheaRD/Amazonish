const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("user", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		role: {
			type: Sequelize.INTEGER,
		},
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false, // if github authentication, change it to allow null
			validate: {notEmpty: true},
		},
	});
	return User;
};
