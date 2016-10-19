var Sequelize = require('sequelize');
var config    = require('config').dbConfig;  // we use node-config to handle environments

// initialize database connection

console.log("database start");
console.log(config.name);
var sequelize = new Sequelize(
config.name,
config.username,
config.password,
config.options
);

console.log("database loaded");
// load models
var models = [
'User'
];

models.forEach(function(model) {
	module.exports[model] = sequelize.import(__dirname + '/' + model);
});
console.log("models loaded");