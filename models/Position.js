module.exports = function(sequelize, Sequelize) {
	var Skill = sequelize.define('skill', {

		name: Sequelize.STRING,
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	}, {
		timestamps: true
	})
	return Skill
}