module.exports = function(sequelize, Sequelize) {
	var Match = sequelize.define('match', {

		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		dateTime: Sequelize.DATE,
		goalsTeam1: Sequelize.INTEGER,
		goalsTeam2: Sequelize.INTEGER
	}, {
		timestamps: true
	})
	return Match
}