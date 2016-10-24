module.exports = function(sequelize, Sequelize) {
	var User = sequelize.define('user', {

		activationCode: Sequelize.STRING,
		birthday: Sequelize.DATE,
		email: {
			type: Sequelize.STRING,
			unique: true
		},
		firstName: Sequelize.STRING,
		lastName: Sequelize.STRING,
		password: Sequelize.STRING,
		phone: Sequelize.STRING,
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		userType: Sequelize.INTEGER,
	}, {
		freezeTableName: true,
		timestamps: true,
		defaultScope: {
			attributes: {
				exclude: ['password']
			}
		}
	});
	return User;
}