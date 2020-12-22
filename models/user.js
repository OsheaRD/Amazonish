const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("user", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		username: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
			validate: {notNull: true, notEmpty: true},
		},
		email: {
			type: Sequelize.STRING,
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
