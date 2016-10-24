module.exports = function(sequelize, Sequelize) {
	var Canton = sequelize.define('canton', {

		name: Sequelize.STRING,
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	}, {
		timestamps: true
	})
	return Canton
}