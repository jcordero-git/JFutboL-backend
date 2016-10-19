module.exports = function(sequelize, Sequelize) {
	var User = sequelize.define ('user', {

		activationCode: Sequelize.STRING,
		birthday: Sequelize.DATE,
		cantonId: Sequelize.INTEGER,
		email: Sequelize.STRING,
		firstName: Sequelize.STRING,
		lastName: Sequelize.STRING,
		password: Sequelize.STRING,
		phone: Sequelize.STRING,
		provinceId: Sequelize.INTEGER,
		userId: Sequelize.INTEGER,
		userType: Sequelize.INTEGER,
	})
	return User
}