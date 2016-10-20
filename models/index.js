var Sequelize = require('sequelize');
var config = require('config').dbConfig; // we use node-config to handle environments

// initialize database connection

console.log("database start");
console.log(config.name);
var sequelize = new Sequelize(
	config.name,
	config.user,
	config.password,
	config.options
);

console.log("database loaded");
// load models
var models = [
	'User',
	'Province',
	'Skill',
	'Canton'
];

models.forEach(function(model) {
	module.exports[model] = sequelize.import(__dirname + '/' + model);
	console.log("Loading model: " + model);
});
console.log("models loaded");

(function(m) {
	//m.User.belongsTo(m.Province);
	m.User.belongsToMany(m.Skill, {
		through: 'playerSkills'
	});
	//m.Province.hasMany(m.User);
	m.Canton.belongsTo(m.Province);
	m.User.belongsTo(m.Canton);
})(module.exports)
sequelize.sync();