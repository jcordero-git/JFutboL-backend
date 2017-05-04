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
	'Canton',
	'Team',
	'TeamPlayer',
	'SoccerField',
	'SoccerCenter',
	'Match',
	'MatchPlayer'
];

models.forEach(function(model) {
	module.exports[model] = sequelize.import(__dirname + '/' + model);
	console.log("Loading model: " + model);
});
console.log("models loaded");

(function(m) {
	m.User.belongsToMany(m.Skill, {
		through: 'playerskills'
	});
	m.Canton.belongsTo(m.Province);
	m.User.belongsTo(m.Canton);

	//m.User.hasMany(m.Team);
	m.Team.belongsTo(m.User, {
		foreignKey: 'captainId',
		as: 'captain'
	});
	m.Team.belongsTo(m.User, {
		foreignKey: 'ownerId',
		as: 'owner'
	});
	m.Team.belongsTo(m.Canton);

	m.TeamPlayer.belongsTo(m.User, {
		foreignKey: 'playerId',
		as: 'player'
	});
	m.TeamPlayer.belongsTo(m.Skill, {
		foreignKey: 'positionId',
		as: 'position'
	});
	m.TeamPlayer.belongsTo(m.Team, {
		foreignKey: 'teamId',
		as: 'team'
	});
	
	
	
	m.SoccerField.belongsTo(m.SoccerCenter);
	m.SoccerCenter.belongsTo(m.Canton);
	m.SoccerCenter.belongsTo(m.User, {
		foreignKey: 'ownerId',
		as: 'owner'
	});
	m.SoccerCenter.hasMany(m.SoccerField);

	m.Match.belongsTo(m.SoccerField);
	m.Match.belongsTo(m.Team, {
		foreignKey: 'team1Id',
		as: 'team1'
	});
	m.Match.belongsTo(m.Team, {
		foreignKey: 'team2Id',
		as: 'team2'
	});

	m.User.belongsToMany(m.Match, {
		as: 'match',
		through: {
			model: m.MatchPlayer,
			unique: false
		},
		foreignKey: 'playerId'
	});

	m.Match.belongsToMany(m.User, {

		as: 'player',
		through: {
			model: m.MatchPlayer,
			unique: false
		},
		foreignKey: 'matchId'
	});

})(module.exports)
sequelize.sync();