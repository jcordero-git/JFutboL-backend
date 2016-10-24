module.exports = function(sequelize, Sequelize) {
	var Team = sequelize.define('team', {

		name: Sequelize.STRING,
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	}, {
		timestamps: true
	})
	return Team
}