module.exports = function(sequelize, Sequelize) {
	var MatchPlayer = sequelize.define('matchPlayer', {

		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		requestStatus: Sequelize.INTEGER
	}, {
		freezeTableName: true,
		timestamps: true
	})
	return MatchPlayer
}