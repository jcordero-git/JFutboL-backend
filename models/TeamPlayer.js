module.exports = function(sequelize, Sequelize) {
	var TeamPlayer = sequelize.define('teamPlayer', {
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
	return TeamPlayer
}