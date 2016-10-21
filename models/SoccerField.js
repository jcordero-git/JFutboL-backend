module.exports = function(sequelize, Sequelize) {
	var SoccerField = sequelize.define('soccerField', {

		name: Sequelize.STRING,
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		closeTime: Sequelize.TIME,
		openTime: Sequelize.TIME,
		status: Sequelize.INTEGER
	}, {
		timestamps: true
	})
	return SoccerField
}