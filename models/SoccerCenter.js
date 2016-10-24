module.exports = function(sequelize, Sequelize) {
	var SoccerCenter = sequelize.define('soccerCenter', {
		name: Sequelize.STRING,
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		closeTime: Sequelize.TIME,
		openTime: Sequelize.TIME,
		email: Sequelize.STRING,
		phone: Sequelize.STRING,
		address: Sequelize.STRING
	}, {
		timestamps: true
	})
	return SoccerCenter
}