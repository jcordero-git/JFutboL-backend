module.exports = function(sequelize, Sequelize) {
	var Province = sequelize.define('province', {

		name: Sequelize.STRING,
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	}, {
		timestamps: true
	})
	return Province
}