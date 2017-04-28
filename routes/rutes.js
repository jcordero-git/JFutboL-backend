module.exports = function(app) {

	var mysql = require('mysql');
	var async = require("async");

	var User = app.get('models').User;
	var Province = app.get('models').Province;
	var Skill = app.get('models').Skill;
	var Canton = app.get('models').Canton;
	var Team = app.get('models').Team;
	var TeamPlayer = app.get('models').TeamPlayer;
	var Skill = app.get('models').Skill;
	var SoccerField = app.get('models').SoccerField;
	var SoccerCenter = app.get('models').SoccerCenter;
	var Match = app.get('models').Match;

	var express = require('express');
	var jwt = require('jsonwebtoken');
	var config = require('./../config/config');

	var apkVersion = "0.0.1";

	var connection = mysql.createConnection({
		host: 'nt71li6axbkq1q6a.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
		user: 'mb6u49ef19m2p9gl',
		password: 'xqbw0lfr1zkttj4d',
		database: 'dhcgqhdy14b0gvt3'
	});
	var connection2 = mysql.createConnection({
		host: 'nt71li6axbkq1q6a.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
		user: 'mb6u49ef19m2p9gl',
		password: 'xqbw0lfr1zkttj4d',
		database: 'dhcgqhdy14b0gvt3'
	});

	/*

	var connection = mysql.createConnection({
		host     : 'us-cdbr-iron-east-04.cleardb.net',
		user     : 'bb610dee688b62',
		password : 'ec60664e',
		database : 'heroku_d6467fbeb5b99b3'
	});
	var connection2 = mysql.createConnection({
		host     : 'us-cdbr-iron-east-04.cleardb.net',
		user     : 'bb610dee688b62',
		password : 'ec60664e',
		database : 'heroku_d6467fbeb5b99b3'
	});
	
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '12345',
		database: 'social_match'
	});

	var connection2 = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '12345',
		database: 'social_match'
	});
*/
	app.all('*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		next();
	});

	app.set('superSecret', config.secret); // secret variable	
	var apiRoutes = express.Router();

	// ---------------------------------------------------------
	// route middleware to authenticate and check token
	// ---------------------------------------------------------
	apiRoutes.use(function(req, res, next) {
		// check header or url parameters or post parameters for token
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];

		// decode token
		if (token) {
			// verifies secret and checks exp
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {
				if (err) {
					return res.json({
						success: false,
						message: 'Failed to authenticate token.'
					});
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;
					next();
				}
			});
		} else {
			// if there is no token
			// return an error
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			});
		}
	});

	//var apiRoutes = express.Router(); 

	//apiRoutes.get('/', function(req, res) {
	// res.json({ message: 'Welcome to the coolest API on earth!' });
	//});
	//app.use('/api', apiRoutes);

	//var userVa= require('../model/user');
	//var menuVa= require('./model/menu');
	//var listVa= require('./model/list');	
	//var emailSentVa= require('./model/emailsent');

	http: //developer.android.com/reference/android/content/Context.html#getResources()
		var nodemailer = require('nodemailer');
	var smtpTransport = require('nodemailer-smtp-transport');

	var fs = require('fs');
	var path = require("path");

	function CreateConexion() {
		connection.connect(function(err) {
			if (!err) {
				console.log("Database is connected with connection1 ... \n\n");
			} else {
				console.log("Error connecting database ... \n\n");
			}
		});
		connection.connect(function(err) {
			if (!err) {
				console.log("Database is connected with connection2 ... \n\n");
			} else {
				console.log("Error connecting database ... \n\n");
			}
		});
	}

	console.log("\nApk Version: " + apkVersion);

	verifyApkVersion = function(req, res) {
		res.send({
			"apkVersion": apkVersion
		});

	}

	function copyDefaultUserImage(idUser) {
		var newImageLocation = path.join(__dirname, 'public/images', idUser + ".jpg");
		fs.readFile("public/images/user_default_img.jpg", function(err, data) {
			if (err)
				throw err;
			else {
				fs.writeFile(newImageLocation, data, function(err) {
					console.log("Imagen predeterminada copiada a: " + newImageLocation);
				});
			}
		});
	}

	upload = function(req, res) {
		setTimeout(
			function() {
				console.log("upload starts..");
				res.setHeader('Content-Type', 'text/html');
				if (req.files.length == 0 || req.files.file.size == 0)
					res.send({
						msg: 'No file uploaded at ' + new Date().toString()
					});
				else {
					var file = req.files.file;
					var newImageLocation = path.join(__dirname, 'public/images', file.name);
					console.log(newImageLocation);
					fs.readFile(file.path, function(err, data) {
						if (err)
							throw err;
						else {
							fs.writeFile(newImageLocation, data, function(err) {
								res.json(200, {
									src: 'images/' + file.name,
									size: file.size
								});
								console.log(file.name);
							});
							//res.end("Hello");
							res.send({
								msg: '<b>"' + file.name + '"</b> uploaded to the server at ' + new Date().toString()
							});
						}
					});
				}
			},
			(req.param('delay', 'yes') == 'yes') ? 2000 : -1
		);
	};

	uploadByJson = function(req, res) {
		setTimeout(
			function() {
				console.log("upload by json starts..");
				res.setHeader('Content-Type', 'text/html');
				console.log(req.body.encodedImage);

				var base64Data = req.body.encodedImage;
				var nameImage = req.body.nameImage;

				require("fs").writeFile("public/images/profile/" + nameImage + ".png", base64Data, 'base64', function(err) {
					console.log(err);
				});

				res.send({
					"code": 2000
				})
			},
			(req.param('delay', 'yes') == 'yes') ? 2000 : -1
		);
	};

	uploadDish = function(req, res) {
		setTimeout(
			function() {

				res.setHeader('Content-Type', 'text/html');
				if (req.files.length == 0 || req.files.file.size == 0)
					res.send({
						msg: 'No file uploaded at ' + new Date().toString()
					});
				else {
					var file = req.files.file;
					var newImageLocation = path.join(__dirname, 'public/images/Dish', file.name);
					console.log(newImageLocation);
					fs.readFile(file.path, function(err, data) {
						if (err)
							throw err;
						else {
							fs.writeFile(newImageLocation, data, function(err) {
								res.json(200, {
									src: 'images/Dish/' + file.name,
									size: file.size
								});
								console.log(file.name);
							});
							//res.end("Hello");
							res.send({
								msg: '<b>"' + file.name + '"</b> uploaded to the server at ' + new Date().toString()
							});
						}
					});
				}
			},
			(req.param('delay', 'yes') == 'yes') ? 2000 : -1
		);
	};

	var serverVar = function(dateValue, hourValue) {
		this.serverDate = dateValue;
		this.serverHour = hourValue;

	};

	GetServerHour = function(req, res) {
		var dateAux = new Date;
		var hourAux = dateAux.getHours();
		var server = new serverVar(dateAux, hourAux);
		console.log(server);
		res.autoEtag();
		res.send(JSON.stringify(server));
	};

	var file = __dirname + '/../config/emailConfig.json';
	var transporter;
	fs.readFile(file, 'utf8', function(err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}
		data = JSON.parse(data);
		console.log("Configuracion de Email cargada");
		transporter = nodemailer.createTransport(smtpTransport({
			//service: data.service,
			host: data.host,
			port: data.port,
			secure: data.secure,
			auth: {
				user: data.user,
				pass: data.pass
			}
		}));
		return transporter;
	});
	/*
		var mailOptions = {
	    from: 'Fred Foo ? <foo@blurdybloop.com>', // sender address
	    to: 'jocorbre@gmail.com', // list of receivers
	    subject: 'Hello ?', // Subject line
	    text: 'Hello world ?', // plaintext body
	    html: '<b>Hello world ?</b>' // html body
		};
		
		
		transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	        console.log('Message sent: ' + info.response);
			}
		});
	*/

	//Send Emails
	function sendEmail(mailOptions2) {
		transporter.sendMail(mailOptions2, function(error, info) {
			console.log('Entering sendEmail');
			console.log(mailOptions2);
			console.log(error);
			console.log(info);
			if (error) {
				console.log(error);
			} else {
				console.log('Message sent: ' + info.response);
			}
		});
	}

	/*
		findAllList=function(req, res){
		listVa.find(function(err,list){
		//console.log("menu: "+list);
			if(!err) res.json(list);
			else console.log('Error'+ err);
		});	
		};
		
		registerList=function(req, res){
		var list = new listVa(
			{
			menuname: req.body.menuname,
			idUser:	  req.body.idUser,
			username: req.body.username,
			date: req.body.date
			});
		console.log("List: "+list);
			list.save(function(err){
				if (!err) console.log('list saved');
				else console.log('error'+ err);
			});
			res.send(list);
		};
		
		deleteListById=function(req, res){
		listVa.findById(req.params.id,function(err,list)
			{
			console.log("list to delete: "+list);
			list.remove		
				(function(err)
					{	
					console.log("Function");				
					if(!err) 
						{
						console.log('List Item Removed');
						}
					else 
						{
						console.log('Error'+ err);
						}
					}				
				)
			res.send(list);			
			});	
		};
				
		findAllMenu=function(req, res){
		menuVa.find(function(err,menu){
		//console.log("menu: "+menu);
			if(!err) {
					res.json(menu);
					}
			else console.log('Error'+ err);
		});	
		};
		
		findListByDate=function(req, res){
		var re = new RegExp(req.params.date, 'i');
		listVa.find({date: {$regex: re}},function(err,list){	
			if(!err) {
					res.json(list);
					}
			else console.log('Error'+ err);
		});	
		};
		
		deleteMenuById=function(req, res){
		menuVa.findById(req.params.id,function(err,menu)
			{
			console.log("menu to delete: "+menu);
			menu.remove		
				(function(err)
					{	
					console.log("Function");				
					if(!err) 
						{
						console.log('Menu Removed');
						}
					else 
						{
						console.log('Error'+ err);
						}
					}				
				)
			res.send(menu);			
			});	
		};
		
		findMenuByName=function(req, res){
		menuVa.findOne({menuname:req.params.menuname},function(err,menu)
			{
			console.log("menu found: "+menu);		
			res.json(menu);			
			});	
		};
		
		registerMenu=function(req, res){
		var menu = new menuVa(
			{
			menuname: req.body.menuname,
			price: req.body.price	
			});
		console.log("Menu: "+menu);
			menu.save(function(err){
				if (!err) console.log('menu saved');
				else console.log('error'+ err);
			});
			res.send(menu);
		};
		
		//GET
		findAllUsers=function(req, res){
		userVa.find(function(err,user){
			if(!err) res.json(user);
			else console.log('Error'+ err);
		});	
		};
		
		validateUserPassEncrypt=function(req, res){
		userVa.findOne({username:req.params.username}, function(err,user){
		if(user)
			{
			user.comparePassword(req.params.password, function(err, isMatch){
				if(!err)
				{
				console.log('Password: '+ isMatch );
				if(isMatch==true)
					{
					res.send(user);
					}
				else{
					console.log('Intento fallido de inicio de sesion por parte de: '+req.params.username+' usando el Password: '+ req.params.password );
					res.send(null);
					}
				
				}
				else{
					throw err;	
				}
			});	
			}
		else
			{
			res.send(false);
			}
			//if(!err)
			//else console.log('Error '+err);
			});
		};

		*/

	//Validate User (LOGIN)
	/*validateUser1 = function(req, res) {
		connection.query('SELECT userId, email, password, firstName, lastName, phone, birthday, TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS age,' +
			' activationCode, userType, P.id, P.name provinceName, C.cantonId, C.name cantonName ' +
			' FROM user U INNER JOIN provinces P ON P.id=U.provinceId ' +
			' INNER JOIN cantons C ON C.cantonId=U.cantonId WHERE email="' + req.params.email + '" and password="' + req.params.password + '"',
			function(err, user) {
				if (!err) {
					if (user[0]) {
						connection.query('SELECT PS.skillId, S.skillName, status as intValue from playerSkills PS inner join	user U ON U.userId=PS.userId inner join skills S on S.skillId=PS.skillId' +
							' WHERE  PS.userId=' + user[0].userId,
							function(err, skills) {
								if (!err) {
									//callback(null, skills);
									var data = JSON.stringify(skills);
									user[0].skills = skills;
									var token = jwt.sign(user[0], app.get('superSecret'), {
										//expiresInMinutes: 1440 // expires in 24 hours
									});
									res.send({
										"code": 2000,
										"message": token
									});
								}
							});
					} else {
						res.send({
							"code": 1001,
							"message": "The user or password does not match."
						});
					}
				} else {
					res.send({
						"code": 1002,
						"message": "Errors while trying to login."
					});
				}
			});
	};
*/
	validateUser = function(req, res) {
		var paramEmail = req.params.email;
		var paramPass = req.params.password;
		console.log(paramEmail);
		console.log(paramPass);
		User.scope(null).findOne({ // with scope null, we can be able to retrieve password info for actual user
			where: {
				'email': paramEmail
			},
			raw: true,
			include: [Skill]
		}).then(function(user) {
			if (user && paramPass === user.password) {
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresIn: '24h' // expires in 24 hours
				});
				res.send({
					"code": 2000,
					"message": token
				});
			} else {
				throw new Error();
			}
		}).catch(function(err) {
			console.log(err);
			res.send({
				"code": 1001,
				"message": "The user or password does not match."
			});
		});
	};

	//Get User Info
	apiRoutes.get("/user/:userId", function(req, res) {
		var userId = req.params.userId;

		/*User.findById(10, {
			include: [{
				model: Match,
				as: 'match'
			}]
		}).then(function(team) {
			res.send(team);
		});*/

		User.findById(userId, {
			include: [Skill, {
				model: Canton,
				include: [Province]
			}]
		}).then(function(user) {
			console.log(user);
			if (user) {
				res.send(user.toJSON());
			} else {
				throw new Error();
			}
		}).catch(function(err) {
			console.log(err);
			res.send({
				"code": 1001,
				"message": "User not foud."
			});
		});
		/*User.create({
			birthday: "04/10/89",
			cantonId: 1,
			provinceId: 1,
			email: "jaimir14@gmail.com",
			firstName: "jairo",
			lastName: "miranda",
			password: "123",
			phone: "83186803",
			userType: 1
		}).catch(function(err) {
			console.log(err);
		});*/

		/*connection.query('SELECT userId, email, password, firstName, lastName, phone, birthday, TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS age,' +
			' activationCode, userType, P.id, P.name provinceName, C.cantonId, C.name cantonName' +
			' FROM user U INNER JOIN provinces P ON P.id=U.provinceId ' +
			' INNER JOIN cantons C ON C.cantonId=U.cantonId WHERE userId=' + req.params.userId,
			function(err, user) {
				if (!err) {
					if (user[0]) {
						connection.query('SELECT PS.skillId, S.skillName, status as intValue from playerSkills PS inner join	user U ON U.userId=PS.userId inner join skills S on S.skillId=PS.skillId' +
							' WHERE  PS.userId=' + user[0].userId,
							function(err, skills) {
								if (!err) {
									//callback(null, skills);
									var data = JSON.stringify(skills);
									user[0].skills = skills;
									res.send(userFound);
								}
							}
						);
					} else {
						res.send({
							"code": 1001,
							"message": "The user or password does not match."
						});
					}
				} else {
					res.send({
						"code": 1002,
						"message": err
					});
				}
			});*/
	});

	/*
		findUserByEmail=function(req, res){
		userVa.findOne({email:req.params.email}, function(err,user){
			if(!err) 
			{
			if(user)
			{
			var tempPass = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for( var i=0; i < 5; i++ )
				tempPass += possible.charAt(Math.floor(Math.random() * possible.length));
				
			var mailOptions1 = {
							from: 'AvaLunchs <apps.dev@avantica.net>', // sender address
							to: req.params.email, // list of receivers
							subject: 'AvaLunchs - Recuperacion de Contrasena', // Subject line
							text: 'Recuperación de Contraseña', // plaintext body
							html: '<b>Sr(a)</b>: '+user.username+',<p><b>Su nueva contrasena es: '+tempPass+'</b></p><p>Se recomienda que cambie su contrasena una vez se haya logueado con la contrasena autogenerada..</p></br></br><p><b>AvaLunchs SQA Project Liberia 2014</b><p>' // html body
							};
			//mailOptions1.to=req.params.email;
			user.password=tempPass;
			user.save(function(err) 
					{
					if(!err) 
						{
						sendEmail(mailOptions1);
						console.log('Password was sent successfully');
						} 
						else 
						{
						console.log('ERROR: ' + err);
						}		
					console.log(user);
					res.send(user);		
					}				
					);			
			}else res.send(null);		
			}else console.log('Error '+err);
			}
			)};
		
		var error = function(user,email) {
					this.username= user;
					this.email= email;
					};
		
		
		
					*/

	//Update User Activation Code
	function updateUserActivationcode(userId, activationCode) {
		User.update({
			activationCode: activationCode
		}, {
			where: {
				id: userId
			}
		}).catch(function(err) {
			console.log(err);
		});
	};

	//Generate Activation Code
	function generateActivationCode(userId, userName, email) {
		var activationCode = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (var i = 0; i < 6; i++)
			activationCode += possible.charAt(Math.floor(Math.random() * possible.length));

		var mailOptions = {
			from: 'JFutboL <info@jfutbol.con>', // sender address
			to: email, // list of receivers
			subject: 'JFutboL - Activacion de cuenta', // Subject line
			text: 'Activacion de cuenta', // plaintext body
			html: '<b>Sr(a)</b>: ' + userName + ',<p><b> El codigo de activacion para su cuenta es: ' + activationCode + '</b></p></br></br><p><b>JFutboL by Jose Luis Cordero Brenes</b><p>' // html body
		};
		sendEmail(mailOptions);
		updateUserActivationcode(userId, activationCode);
	};

	//UpdateActivationCode
	function updateActivationCode(userId, userName, email, activationCode) {
		var mailOptions = {
			from: 'JFutboL <info@jfutbol.con>', // sender address
			to: email, // list of receivers
			subject: 'JFutboL - Activacion de cuenta', // Subject line
			text: 'Cuenta activada', // plaintext body
			html: '<b>Sr(a)</b>: ' + userName + ',<p><b> Su cuenta ha sido activada correctamente</b></p></br></br><p><b>JFutboL by Jose Luis Cordero Brenes</b><p>' // html body
		};
		sendEmail(mailOptions);
		updateUserActivationcode(userId, activationCode);
	};

	//Activate User Account
	apiRoutes.post("/user/activateAccount", function(req, res) {
		connection.query('SELECT id, firstName, lastName, email FROM user WHERE email="' + req.body.email + '" AND password="' + req.body.password + '" AND activationCode="' + req.body.activationCode + '"', function(err, user) {
			if (!err) {
				if (user[0]) {
					updateActivationCode(user[0].id, user[0].firstName + " " + user[0].lastName, user[0].email, "");
					res.send({
						"code": 2000,
						"message": "The Account had been activated successfully."
					});
				} else {
					res.send({
						"code": 1001,
						"message": "The Activation Code does not match, try again!"
					});
				}
			} else {
				console.log(err);
				res.send({
					"code": 1001,
					"message": "The Activation Code does not match, try again!"
				});
			}
		});
	});

	//User Register
	registerUser = function(req, res) {
		var existUserName = false;
		var existEmail = false;
		connection.query('SELECT userId FROM user WHERE email="' + req.body.email + '"', function(err, user) {
			if (!err) {
				if (user[0]) {
					if (user[0].userId != 0) {
						console.log(user[0].userId);
					}
					res.send({
						"code": 1002,
						"message": "Email already exist in our data base, try again!"
					});
					console.log('REGISTER - An user is trying to register an existing Email, email used: ' + req.body.email);
				} else {
					connection.query('INSERT INTO user (email, password, firstName, lastName, phone, birthday, userType, provinceId, cantonId) VALUES ("' +
						req.body.email + '","' + req.body.password + '","' + req.body.firstName + '","' + req.body.lastName + '","' + req.body.phone + '","' + req.body.birthday + '",' + req.body.userType + ',' + req.body.provinceId + ',' + req.body.cantonId + ')',
						function(insertUserErr, user) {
							if (!insertUserErr) {
								connection.query('SELECT userId FROM user WHERE email="' + req.body.email + '"', function(selectUserErr, userInserted) {
									if (!selectUserErr) {
										console.log('REGISTER - A new user was registered successfully using the email: ' + req.body.email);
										generateActivationCode(userInserted[0].userId, req.body.firstName + ' ' + req.body.lastName, req.body.email);
										if (req.body.skills.length) {
											for (var i = 0; i < req.body.skills.length; i++) {
												connection.query('INSERT INTO playerSkills (userId, skillId, status) VALUES(' +
													userInserted[0].userId + ',"' + req.body.skills[i].skillId + '",' + req.body.skills[i].intValue + ')',
													function(insertSkillErr, user) {
														if (!insertSkillErr) {
															//console.log('A new skill was registered to the userId: '+userInserted[0].userId+' using the value: '+ req.body.skills[i].intValue ,"");  									  	
														} else {
															//res.send({"code": 2000, "message": "The user was registered but the skills have errors, try to update them!", "userId":userInserted[0].userId});
															console.log(insertSkillErr);
														}
													});
											}
										}
										var base64Data = req.body.encodedImage;
										if (base64Data != "") {
											require("fs").writeFile("public/images/profile/" + userInserted[0].userId + ".png", base64Data, 'base64', function(err) {

											});
										} else {
											fs.readFile("public/images/profile/default.png", function(err, data) {
												if (err)
													throw err;
												else {
													fs.writeFile("public/images/profile/" + userInserted[0].userId + ".png", data, function(err) {

													});
												}
											});
										}
										res.send({
											"code": 2000,
											"message": "The new user was registered successfully.",
											"userId": userInserted[0].userId
										});

									} else {
										console.log(insertUserErr);
									}
								});
							} else {
								res.send({
									"code": 1003,
									"message": "The are errors while try to register a new user in this moment, try later please!"
								});
								console.log(insertUserErr);
							}
						});
				}
			}
		});
	};

	//Search User
	searchUser = function(req, res) {
		var existUserName = false;
		var existEmail = false;

		connection.query('SELECT * FROM user U inner join playerskills PS on PS.userId=U.userId where PS.skillId in (' + req.params.skills + ') AND PS.status=1 GROUP BY U.userId;', function(err, user) {
			if (!err) {
				if (user[0]) {
					if (user[0].userId != 0) {
						res.send(user);
					}
				} else {
					res.send({
						"code": 1002,
						"message": "No players found using this search criteria, try again!"
					});
					console.log('No players found using this search criteria, try again!', "");
				}
			}
		});
	};

	//Search Player
	apiRoutes.get("/players/:player", function(req, res) {
		var existUserName = false;
		var existEmail = false;
		connection.query('SELECT * FROM user U inner join playerskills PS on PS.userId=U.userId where U.firstName like "' + req.params.player.firstName + '%" AND PS.skillId in (' + req.params.player.skills + ') AND PS.status=1 AND U.userType=1 GROUP BY U.userId;', function(err, user) {
			if (!err) {
				if (user[0]) {
					connection.query('SELECT PS.skillId, status as intValue from playerSkills PS inner join	user U ON U.userId=PS.userId inner join skills S on S.skillId=PS.skillId' +
						' WHERE PS.userId=' + user[0].userId,
						function(err, skills) {
							if (!err) {
								//callback(null, skills);
								var data = JSON.stringify(skills);
								user[0].skills = skills;
								res.send(user[0]);
							}
						});
				} else {
					res.send({
						"code": 1002,
						"message": "No players found using this search criteria, try again!"
					});
					console.log('No players found using this search criteria, try again!', "");
				}
			} else {
				res.send({
					"code": 1002,
					"message": "No players found using this search criteria, try again!"
				});
				console.log('No players found using this search criteria, try again!', "");
			}
		});
	});

	//Register team
	apiRoutes.post("/team", function(req, res) {
		connection.query('INSERT INTO teams (ownerId, name, provinceId, cantonId) VALUES (' +
			req.body.ownerId + ',"' + req.body.name + '",' + req.body.provinceId + ',' + req.body.cantonId + ')',
			function(insertTeamErr, team) {
				if (!insertTeamErr) {
					var base64Data = req.body.encodedImage;
					if (base64Data != "") {
						require("fs").writeFile("public/images/team/" + team.insertId + ".png", base64Data, 'base64', function(err) {

						});
					} else {
						fs.readFile("public/images/team/default.png", function(err, data) {
							if (err)
								throw err;
							else {
								fs.writeFile("public/images/team/" + team.insertId + ".png", data, function(err) {

								});
							}
						});
					}

					res.send({
						"code": 2000,
						"message": "The team was created successfully."
					});
				} else {
					res.send({
						"code": 1003,
						"message": "There are errors while creating the team, try again!"
					});
					console.log('There are errors while creating the team, try again!', insertTeamErr);
				}
			});
	});

	//Update team by teamId
	apiRoutes.post("/team/update/:teamId", function(req, res) {
		var teamId = req.params.teamId;
		var base64Data = req.body.encodedImage;
		if (base64Data != "") {
			require("fs").writeFile("public/images/team/" + teamId + ".png", base64Data, 'base64', function(err) {});
		}
		connection.query('UPDATE teams SET name="' + req.body.name +
			'", provinceId=' + req.body.provinceId +
			', cantonId=' + req.body.cantonId + ' WHERE teamId=' + teamId,
			function(updateTeamErr, team) {
				if (!updateTeamErr) {
					res.send({
						"code": 2000,
						"message": "The team was updated successfully."
					});
				} else {
					res.send({
						"code": 1003,
						"message": "There are errors while updating the team, try again!"
					});
					console.log('There are errors while updating the team, try again!', updateTeamErr);
				}
			});
	});

	//user who has an especific token
	apiRoutes.get('/check', function(req, res) {
		res.json(req.decoded);
	});

	//all teams except mine one
	apiRoutes.get("/team/noMyTeams/:ownerId", function(req, res) {
		connection.query('SELECT * FROM teams WHERE ownerId!=' + req.params.ownerId, function(selectTeamErr, team) {
			if (!selectTeamErr) {
				res.send(team);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while getting the teams, try again!"
				});
				console.log('There are errors while getting the teams, try again!', selectTeamErr);
			}
		});
	});

	//All my teams
	apiRoutes.get("/team/:ownerId", function(req, res) {
		connection.query('SELECT T.teamId, T.ownerId, T.name, T.captainId, concat(U.firstName," ", U.lastName) as completeCaptainName, T.provinceId, P.name provinceName, T.cantonId, C.name cantonName, COUNT(TP.playerId) countPlayers' +
			' FROM teams T ' +
			' LEFT JOIN user U ON U.userId=T.captainId' +
			' INNER JOIN provinces P ON T.provinceId=P.provinceId' +
			' INNER JOIN cantons C ON T.cantonId=C.cantonId' +
			' LEFT JOIN teamplayer TP ON TP.teamId=T.teamId' +
			' WHERE ownerId=' + req.params.ownerId +
			' GROUP BY T.teamId',
			function(selectTeamErr, team) {
				if (!selectTeamErr) {
					res.send(team);
				} else {
					res.send({
						"code": 1003,
						"message": "There are errors while getting the teams, try again!"
					});
					console.log('There are errors while getting the teams, try again!', selectTeamErr);
				}
			});
	});

	//team where an especific user is included
	apiRoutes.get("/players/:playerId/teams", function(req, res) {
		connection.query('SELECT T.teamId,T.ownerId,T.name FROM teams T INNER JOIN teamplayer TP ON TP.teamId=T.teamId WHERE TP.playerId=' + req.params.playerId, function(selectTeamErr, team) {
			if (!selectTeamErr) {
				res.send(team);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while getting the teams, try again!"
				});
				console.log('There are errors while getting the teams, try again!', selectTeamErr);
			}
		});
	});

	//Delete an especific team
	apiRoutes.get("/team/delete/:teamId", function(req, res) {
		connection.query('DELETE FROM teams WHERE teamId=' + req.params.teamId, function(selectTeamErr, team) {
			if (!selectTeamErr) {
				require("fs").unlink("public/images/team/" + req.params.teamId + ".png", function(err) {
					if (err) throw err;
				});

				res.send({
					"code": 2000,
					"message": "The team was eliminated successfully."
				});
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while deleting the team, try again!"
				});
				console.log('There are errors while deleting the team, try again!', selectTeamErr);
			}
		});
	});

	//Get all players included on specific team
	apiRoutes.get("/team/:teamId/players", function(req, res) {
		getTeamPlayersAux(req.params.teamId, function(err, result) {
			if (result) {
				res.send(result);
			} else {
				res.send({
					"code": 1002,
					"message": "No players found using this search criteria, try again!"
				});
				console.log('No players found using this search criteria, try again!', "");
			}
		});
	});

	function getTeamPlayersAux(teamId, callback) {
		connection.query('SELECT U.userId, U.email, U.password, U.firstName, U.lastName, U.phone, U.birthday,TIMESTAMPDIFF(YEAR, U.birthday, CURDATE()) AS age, S.skillName as position, TP.requestStatus' +
			' FROM user U INNER join teamplayer TP on U.userId=TP.playerId INNER join Skills S on TP.position = S.skillId WHERE TP.teamId=' + teamId + ' ORDER BY TP.requestStatus DESC',
			function(error, results, fields) {
				async.map(results, getPlayerSkills, callback);
			});
	};

	//Get Players
	apiRoutes.get("/players/:searchType/:searchKey/:provinceId/:cantonId", function(req, res) {
		getPlayersAux(req.params.searchType, req.params.searchKey, req.params.provinceId, req.params.cantonId, function(err, result) {
			if (result) {
				res.send(result);
			} else {
				res.send({
					"code": 1002,
					"message": "No players found using this search criteria, try again!"
				});
				console.log('No players found using this search criteria, try again!', "");
			}
		});
	});

	function getPlayersAux(searchType, searchKey, provinceId, cantonId, callback) {

		var query;
		if (searchType == "all")
			query = 'SELECT U.userId, U.email, U.password, U.firstName, U.lastName, U.phone, U.birthday,TIMESTAMPDIFF(YEAR, U.birthday, CURDATE()) AS age' +
			' FROM user U WHERE U.userType=1 AND U.provinceId IN (' + provinceId + ') AND U.cantonId IN (' + cantonId + ')';
		if (searchType == "team")
			query = 'SELECT U.userId, U.email, U.password, U.firstName, U.lastName, U.phone, U.birthday,TIMESTAMPDIFF(YEAR, U.birthday, CURDATE()) AS age' +
			' FROM user U WHERE U.userType=1 AND U.provinceId IN (' + provinceId + ') AND U.cantonId IN (' + cantonId + ')' +
			' AND U.userId NOT IN(SELECT TP.playerId FROM teamplayer TP WHERE TP.teamId=' + searchKey + ')';
		if (searchType == "match")
			query = 'SELECT U.userId, U.email, U.password, U.firstName, U.lastName, U.phone, U.birthday,TIMESTAMPDIFF(YEAR, U.birthday, CURDATE()) AS age' +
			' FROM user U WHERE U.userType=1 AND U.provinceId IN (' + provinceId + ') AND U.cantonId IN (' + cantonId + ')' +
			' AND U.userId NOT IN(SELECT MP.playerID FROM matchplayer MP WHERE MP.matchId=' + searchKey + ')';
		connection.query(query,
			function(error, results, fields) {
				//console.log("test"+results);
				async.map(results, getPlayerSkills, callback);
			});
	}

	function getPlayerSkills(resultItem, callback) {
		connection.query('SELECT PS.skillId, S.skillName, status as intValue from playerskills PS inner join user U ON U.userId=PS.userId inner join skills S on S.skillId=PS.skillId' +
			' WHERE PS.userId=' + resultItem.userId + " AND status=1",
			function(error, results, fields) {
				var skills = results.map(getSkillsJson);
				callback(error, {
					userId: resultItem.userId,
					email: resultItem.email,
					password: resultItem.password,
					firstName: resultItem.firstName,
					lastName: resultItem.lastName,
					age: resultItem.age,
					position: resultItem.position,
					requestStatus: resultItem.requestStatus,
					phone: resultItem.phone,
					birthday: resultItem.birthday,
					skills: skills
				});
			});
	}

	function getSkillsJson(resultItem) {
		return {
			skillId: resultItem.skillId,
			skillName: resultItem.skillName,
			skill: resultItem.skill,
			intValue: resultItem.intValue,
		};
	};

	getSkills = function(req, res) {
		connection2.query('SELECT * FROM skills ORDER BY skillId ASC', function(selectSkillsErr, skill) {
			if (!selectSkillsErr) {
				res.send(skill);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while getting the skills, try again!"
				});
				console.log('There are errors while getting the skills, try again!', selectSkillsErr);
			}
		});
	};

	//Get all the Skills by user ID
	apiRoutes.get("/players/:playerId/skills", function(req, res) {
		connection2.query('SELECT PS.skillId, S.skillName, status as intValue from playerSkills PS inner join user U ON U.userId=PS.userId inner join skills S on S.skillId=PS.skillId' +
			' WHERE PS.userId=' + req.params.playerId,
			function(selectSkillsErr, skills) {
				if (!selectSkillsErr) {
					res.send(skills);
				} else {
					res.send({
						"code": 1003,
						"message": "There are errors while getting the skills, try again!"
					});
					console.log('There are errors while getting the skills, try again!', selectSkillsErr);
				}
			});
	});

	//Add a player to the especific team
	apiRoutes.post("/team/:teamId", function(req, res) {
		connection.query('INSERT INTO teamplayer (teamId, playerId, position, requestStatus) VALUES (' + req.params.teamId + ',' + req.body.userId + ', "' + req.body.skills[0].skillId + '","1")', function(addTeamPlayerErr, player) {
			if (!addTeamPlayerErr) {
				res.send(player);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while adding the player to the team, try again!"
				});
				console.log('TEAMPLAYER - REGISTER TEAMPLAYER: There are errors while adding the player to the team, try again!', addTeamPlayerErr);
			}
		});
	});

	//Update Team player request
	apiRoutes.get("/team/playerRequest/:teamPlayerId/:requestStatus", function(req, res) {
		connection.query('UPDATE teamplayer SET requestStatus=' + req.params.requestStatus + ' WHERE teamPlayerId=' + req.params.teamPlayerId, function(addTeamPlayerErr, player) {
			if (!addTeamPlayerErr) {
				if (player.affectedRows > 0) {
					res.send({
						"code": 2000,
						"message": "Team player Request Status updated"
					});
					console.log('TEAMPLAYER - REQUEST STATUS: Team player Request Status updated');
				} else {
					res.send({
						"code": 2001,
						"message": "No Team player Request Status updated"
					});
					console.log('TEAMPLAYER - REQUEST STATUS: No Team player Request Status updated');
				}
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while adding the player to the team, try again!"
				});
				console.log('TEAMPLAYER - REQUEST STATUS: There are errors while changing the requestStatus.', addTeamPlayerErr);
			}
		});
	});

	/*Add an extra player to the especific match
		apiRoutes.post("/matchplayer/:matchId/:teamId", function(req, res){
			connection.query('INSERT INTO matchplayer (matchId, playerId, position, requestStatus, teamId) VALUES ('+req.params.matchId+','+req.body.userId+',"'+req.body.skills[0].skillId+'", "1", '+req.params.teamId+')'
					, function(addMatchPlayerErr, player) {	
				  if (!addMatchPlayerErr)
					  {	
					  res.send(player);
					  }
				  else{
					  res.send({"code": 1003, "message": "There are errors while adding the player to the match, try again!"});
					  console.log('TEAMPLAYER - REGISTER TEAMPLAYER: There are errors while adding the player to the match, try again!', addMatchPlayerErr);
					}			  
			});		
		});
	*/

	//Add an extra player to the especific match
	apiRoutes.post("/matchplayer/:matchId/:teamId", function(req, res) {
		connection.query('CALL SP_add_playerMatch(' + req.params.matchId + ',' + req.body.userId + ',"' + req.body.skills[0].skillId + '", ' + req.params.teamId + ')', function(addMatchPlayerErr, player) {
			if (!addMatchPlayerErr) {
				res.send(player);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while adding the player to the match, try again!"
				});
				console.log('TEAMPLAYER - REGISTER TEAMPLAYER: There are errors while adding the player to the match, try again!', addMatchPlayerErr);
			}
		});
	});

	//Update Match player request
	apiRoutes.get("/match/playerRequest/:matchPlayerId/:requestStatus", function(req, res) {
		console.log('MATCHPLAYER - REQUEST STATUS: updating the status to the matchPlayerId: ' + req.params.matchPlayerId + ', to :' + req.params.requestStatus);
		connection.query('UPDATE matchplayer SET requestStatus=' + req.params.requestStatus + ' WHERE matchPlayerId=' + req.params.matchPlayerId, function(addTeamPlayerErr, player) {
			if (!addTeamPlayerErr) {
				if (player.affectedRows > 0) {
					res.send({
						"code": 2000,
						"message": "Match player Request Status updated"
					});
					console.log('MATCHPLAYER - REQUEST STATUS: Match player Request Status updated');
				} else {
					res.send({
						"code": 2001,
						"message": "No Match player Request Status updated"
					});
					console.log('MATCHPLAYER - REQUEST STATUS: No Match player Request Status updated');
				}
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while updating Match player Request, try again!"
				});
				console.log('MATCHPLAYER - REQUEST STATUS: There are errors while changing the requestStatus.', addTeamPlayerErr);
			}
		});
	});

	//Update Field Disponibility Field Owner request
	apiRoutes.get("/disponibilityField/ownerRequest/:soccerfieldsdisponibilityscheduleId/:requestStatus/:idLastUpdate", function(req, res) {
		console.log('DISPONIBILITY FIELD - REQUEST STATUS: updating the status to the soccerfieldsdisponibilityscheduleId: ' + req.params.soccerfieldsdisponibilityscheduleId + ', to :' + req.params.requestStatus);
		var status = 0;
		if (req.params.requestStatus == 0) {
			status = 5
		}
		if (req.params.requestStatus == 2) {
			status = 2
		}
		connection.query('UPDATE soccerfieldsdisponibilityschedule SET isReserved=' + status + ', idLastUpdate=' + req.params.idLastUpdate + ' WHERE soccerfieldsdisponibilityscheduleId=' + req.params.soccerfieldsdisponibilityscheduleId, function(requestErr, request) {
			if (!requestErr) {
				if (request.affectedRows > 0) {
					res.send({
						"code": 2000,
						"message": "Match player Request Status updated"
					});
					console.log('DISPONIBILITY FIELD - REQUEST STATUS: disponibilityField Owner Request Status updated');
				} else {
					res.send({
						"code": 2001,
						"message": "No Match player Request Status updated"
					});
					console.log('DISPONIBILITY FIELD - REQUEST STATUS: No disponibilityField Owner Request Status updated');
				}
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while updatin disponibilityField Owner Request, try again!"
				});
				console.log('DISPONIBILITY FIELD - REQUEST STATUS: There are errors while changing the requestStatus.', requestErr);
			}
		});
	});

	//Update Field Disponibility Team Owner request
	apiRoutes.get("/disponibilityField/teamOwnerRequest/:soccerfieldsdisponibilityscheduleId/:requestStatus/:idLastUpdate", function(req, res) {
		console.log('DISPONIBILITY FIELD - REQUEST STATUS: updating the status to the soccerfieldsdisponibilityscheduleId: ' + req.params.soccerfieldsdisponibilityscheduleId + ', to :' + req.params.requestStatus + ' by the userId: ' + req.params.idLastUpdate);
		if (req.params.requestStatus == 2) {
			connection.query('UPDATE soccerfieldsdisponibilityschedule SET isReserved=(isReserved + 1), idLastUpdate=' + req.params.idLastUpdate + ' WHERE soccerfieldsdisponibilityscheduleId=' + req.params.soccerfieldsdisponibilityscheduleId, function(requestErr, request) {
				if (!requestErr) {
					if (request.affectedRows > 0) {
						res.send({
							"code": 2000,
							"message": "Match player Request Status updated"
						});
						console.log('DISPONIBILITY FIELD - REQUEST STATUS: disponibilityField Owner Request Status updated');
					} else {
						res.send({
							"code": 2001,
							"message": "No Match player Request Status updated"
						});
						console.log('DISPONIBILITY FIELD - REQUEST STATUS: No disponibilityField Owner Request Status updated');
					}
				} else {
					res.send({
						"code": 1003,
						"message": "There are errors while updatin disponibilityField Owner Request, try again!"
					});
					console.log('DISPONIBILITY FIELD - REQUEST STATUS: There are errors while changing the requestStatus.', requestErr);
				}
			});
		}
		if (req.params.requestStatus == 0) {
			connection.query('UPDATE soccerfieldsdisponibilityschedule SET isReserved=-1, idLastUpdate=' + req.params.idLastUpdate + ' WHERE soccerfieldsdisponibilityscheduleId=' + req.params.soccerfieldsdisponibilityscheduleId, function(requestErr, request) {
				if (!requestErr) {
					if (request.affectedRows > 0) {
						res.send({
							"code": 2000,
							"message": "Match player Request Status updated"
						});
						console.log('DISPONIBILITY FIELD - REQUEST STATUS: disponibilityField Owner Request Status updated');
					} else {
						res.send({
							"code": 2001,
							"message": "No Match player Request Status updated"
						});
						console.log('DISPONIBILITY FIELD - REQUEST STATUS: No disponibilityField Owner Request Status updated');
					}
				} else {
					res.send({
						"code": 1003,
						"message": "There are errors while updatin disponibilityField Owner Request, try again!"
					});
					console.log('DISPONIBILITY FIELD - REQUEST STATUS: There are errors while changing the requestStatus.', requestErr);
				}
			});
		}
	});

	//Set Captain to a team
	apiRoutes.get("/team/captain/:teamId/:playerId", function(req, res) {
		connection.query('UPDATE teams SET captainId=' + req.params.playerId + ' WHERE teamId=' + req.params.teamId, function(selectTeamErr, team) {
			if (!selectTeamErr) {
				res.send(team);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while deleting the teams player, try again!"
				});
				console.log('There are errors while deleting the teams player, try again!', selectTeamErr);
			}
		});
	});

	//Delete an especific player from especific team
	apiRoutes.get("/team/delete/:teamId/:playerId", function(req, res) {
		connection.query('DELETE FROM teamplayer WHERE teamId=' + req.params.teamId + ' AND playerId=' + req.params.playerId, function(selectTeamErr, team) {
			if (!selectTeamErr) {
				res.send(team);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while deleting the teams player, try again!"
				});
				console.log('There are errors while deleting the teams player, try again!', selectTeamErr);
			}
		});
	});

	//Get all new notification for an especific user
	apiRoutes.get("/playersNotifications/:playerId", function(req, res) {
		connection.query('SELECT notificationsId, shortNotification, notification, userId, DATE_FORMAT(date,"%Y-%m-%d %T") as date, status, type, keyId, img FROM notifications WHERE status=0 AND userId=' + req.params.playerId + ' ORDER BY date DESC', function(selectNotificationsErr, notifications) {
			if (!selectNotificationsErr) {
				res.send(notifications);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while getting the teams, try again!"
				});
				console.log('There are errors while getting the teams, try again!', selectNotificationsErr);
			}
		});
	});

	//Get counter of all new notification for an especific user
	apiRoutes.get("/playersNotificationsCount/:playerId", function(req, res) {
		connection.query('SELECT COUNT(notificationsID) as newNotifications FROM notifications WHERE status=0 AND userId=' + req.params.playerId + ' ORDER BY date DESC', function(selectNotificationsErr, notifications) {
			if (!selectNotificationsErr) {
				res.send(notifications[0]);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while getting the teams, try again!"
				});
				console.log('There are errors while getting the teams, try again!', selectNotificationsErr);
			}
		});
	});

	//Get Notification Status
	apiRoutes.get("/playersNotificationStatus/:notificationId", function(req, res) {
		connection.query('UPDATE  notifications N SET status=1 WHERE N.notificationsId=' + req.params.notificationId, function(updateNotificationStatusErr, notification) {
			if (!updateNotificationStatusErr) {
				res.send(notification);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while updating the notification status, try again!"
				});
				console.log('There are errors while updating the notification status, try again!', updateNotificationStatusErr);
			}
		});
	});

	//Get all existing matches
	apiRoutes.get("/matches", function(req, res) {
		connection.query('SELECT M.id, M.team1Id, T1.name team1Name, M.goalsTeam1, M.team2Id, T2.name team2Name, M.goalsTeam2, M.dateTime,' +
			' T1.captainId team1captainId, T2.captainId team2captainId, DATE_FORMAT(SFDS.date,"%Y-%m-%d") as date, SFDS.startTime, SFDS.endTime, SF.name soccerFieldName, SC.name soccerCenterName, SFDS.isReserved' +
			' FROM matches M' +
			' INNER JOIN teams T1' +
			' ON T1.id=M.team1Id' +
			' INNER JOIN teams T2' +
			' ON T2.id=M.team2Id' +
			' INNER JOIN soccerfieldsdisponibilityschedule SFDS' +
			' ON M.id=SFDS.matchId' +
			' INNER JOIN soccerfields SF' +
			' ON SFDS.soccerFieldId=SF.id' +
			' INNER JOIN soccercenters SC' +
			' ON SF.soccerCenterId=SC.id WHERE SFDS.isReserved=4 ORDER BY M.dateTime DESC',
			function(selectMatchErr, Match) {
				if (!selectMatchErr) {
					res.send(Match);
				} else {
					res.send({
						"code": 1003,
						"message": "There are errors while getting the matches, try again!"
					});
					console.log('There are errors while getting the matches, try again!', selectMatchErr);
				}
			});
	});

	//Get My matches
	apiRoutes.get("/matches/:playerId", function(req, res) {
		connection.query('SELECT M.matchID, M.team1ID, T1.name team1Name, M.goalsTeam1, M.team2ID, T2.name team2Name, M.goalsTeam2, M.dateTime,' +
			' T1.captainId team1captainId, T2.captainId team2captainId, T1.ownerId team1OwnerId, T2.ownerId team2OwnerId, DATE_FORMAT(SFDS.date,"%Y-%m-%d") as date, SFDS.startTime, SFDS.endTime, SF.name soccerFieldName, SC.name soccerCenterName, SFDS.isReserved, TP.teamId myTeamId, T.name myTeamName, T.provinceId myTeamProvinceId, P.name myTeamProvinceName, T.cantonId myTeamCantonId, C.name myTeamCantonName' +
			' FROM matches M' +
			' INNER JOIN teams T1 ON T1.teamId=M.team1ID' +
			' INNER JOIN teams T2 ON T2.teamId=M.team2ID' +
			' INNER JOIN matchplayer MP ON MP.matchID=M.matchId' +
			' INNER JOIN soccerfieldsdisponibilityschedule SFDS ON M.matchId=SFDS.matchId' +
			' INNER JOIN soccerfields SF ON SFDS.soccerFieldId=SF.soccerFieldId' +
			' INNER JOIN soccercenters SC ON SF.soccerCenterId=SC.soccerCenterId' +
			' LEFT JOIN teamplayer TP ON TP.teamId=T1.teamId OR TP.teamId=T2.teamId' +
			' LEFT JOIN teams T ON T.teamId = TP.teamId' +
			' LEFT JOIN provinces P ON P.provinceId = T.provinceId' +
			' LEFT JOIN cantons C ON C.cantonId = T.cantonId' +
			' WHERE (MP.playerID=' + req.params.playerId + ' AND TP.playerId=' + req.params.playerId +
			') OR T.ownerId=' + req.params.playerId +
			' GROUP BY M.matchID ORDER BY M.dateTime DESC',
			function(selectMatchErr, Match) {
				if (!selectMatchErr) {
					res.send(Match);
				} else {
					res.send({
						"code": 1003,
						"message": "There are errors while getting the matches, try again!"
					});
					console.log('There are errors while getting the matches, try again!', selectMatchErr);
				}
			});
	});

	//Register a new match
	apiRoutes.post("/matches", function(req, res) {
		connection.query('INSERT INTO matches (team1ID, team2ID, goalsTeam1, goalsTeam2, dateTime) VALUES (' +
			req.body.team1ID + ',' + req.body.team2ID + ',' + req.body.goalsTeam1 + ',' + req.body.goalsTeam2 + ',"' + req.body.date + ' ' + req.body.startTime + '")',
			function(insertMatchErr, Match) {
				if (!insertMatchErr) {
					connection.query('INSERT INTO soccerfieldsdisponibilityschedule (soccerFieldId, date, startTime, endTime, matchId, isReserved) VALUES (' +
						req.body.soccerFieldId + ',"' + req.body.date + '","' + req.body.startTime + '","' + req.body.endTime + '",' + Match.insertId + ', 1)',
						function(insertMatchErr, Match) {
							if (!insertMatchErr) {
								res.send({
									"code": 2000
								});
							} else {
								res.send({
									"code": 1003
								});
								console.log('There are errors while register the match, try again!', insertMatchErr);
							}
						});
				} else {
					res.send({
						"code": 1003
					});
					console.log('There are errors while register the match, try again!', insertMatchErr);
				}
			});
	});

	//Get all players from an especific match and especific team
	apiRoutes.get("/match/:matchId/:teamId/players", function(req, res) {
		connection.query('SELECT * from (' +
			'SELECT U.userId, U.email, U.password, U.firstName, U.lastName, U.phone, U.birthday,TIMESTAMPDIFF(YEAR, U.birthday, CURDATE()) AS age,' +
			' S.skillName as position, MP.requestStatus, 0 extraPlayer FROM user U' +
			' INNER JOIN matchplayer MP ON U.userId=MP.playerId' +
			' INNER JOIN teamplayer TP ON TP.playerId=MP.playerID' +
			' INNER JOIN Skills S on TP.position = S.skillId' +
			' INNER JOIN teams T ON T.teamId=TP.teamID' +
			' INNER JOIN matches M ON M.matchID=MP.matchID WHERE (TP.teamId=' + req.params.teamId + ' AND M.matchID=' + req.params.matchId + ' AND MP.teamId IS NULL)' +
			' UNION ' +
			' SELECT U.userId, U.email, U.password, U.firstName, U.lastName, U.phone, U.birthday,TIMESTAMPDIFF(YEAR, U.birthday, CURDATE()) AS age,' +
			' S.skillName as position, MP.requestStatus, 1 extraPlayer FROM user U' +
			' INNER JOIN matchplayer MP ON U.userId=MP.playerId' +
			' INNER JOIN Skills S on MP.position = S.skillId' +
			' INNER JOIN teams T on T.teamId=MP.teamId' +
			' INNER JOIN matches M ON M.matchID=MP.matchID WHERE (MP.teamId=' + req.params.teamId + ' AND M.matchID=' + req.params.matchId + ' AND MP.teamId IS NOT NULL)' +
			') a ORDER BY a.requestStatus DESC',
			function(selectPlayersErr, players) {
				if (!selectPlayersErr) {
					res.send(players);
				} else {
					res.send({
						"code": 1003,
						"message": "There are errors while getting the players, try again!"
					});
					console.log('There are errors while getting the players, try again!', selectPlayersErr);
				}
			});
	});

	//Delete an especific player from especific match
	apiRoutes.get("/matchPlayer_DeletePlayer/:matchId/:playerId", function(req, res) {
		connection.query('DELETE FROM matchplayer WHERE matchId=' + req.params.matchId + ' AND playerId=' + req.params.playerId, function(selectMatchPlayerErr, matchplayer) {
			if (!selectMatchPlayerErr) {
				res.send(matchplayer);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while deleting the player from the match, try again!"
				});
				console.log('There are errors while deleting the player from the match, try again!', selectMatchPlayerErr);
			}
		});
	});

	//Delete Player Skills for an especific user using the user ID
	apiRoutes.get("/players_skills_delete/:playerId/:skillId", function(req, res) {
		connection.query('UPDATE playerSkills SET status=0 WHERE userId=' + req.params.playerId + ' AND skillId="' + req.params.skillId + '"', function(skillErr, user) {
			if (!skillErr) {
				res.send({
					"code": 2000,
					"message": "The user was updated successfully."
				});
				//console.log('A new skill was registered to the userId: '+userInserted[0].userId+' using the value: '+ req.body.skills[i].intValue ,"");  
			} else {
				res.send({
					"code": 2000,
					"message": "The user was updated but the skills have errors, try to update again!"
				});
				console.log(insertSkillErr);
			}
		});
	});

	//Update User information by user ID	
	apiRoutes.post("/user/:updatePass/:updateSkills", function(req, res) {
		var updatePass = req.params.updatePass;
		var updateSkills = req.params.updateSkills;
		var base64Data = req.body.encodedImage;
		if (base64Data != "") {
			require("fs").writeFile("public/images/profile/" + req.body.userId + ".png", base64Data, 'base64', function(err) {});
		}
		if (updatePass == "true") {
			connection.query('UPDATE user SET email="' + req.body.email + '", password="' + req.body.password + '", firstName="' +
				req.body.firstName + '", lastName="' + req.body.lastName + '", phone="' + req.body.phone + '", birthday="' + req.body.birthday + '", provinceId=' + req.body.provinceId + ', cantonId=' + req.body.cantonId + ' WHERE userId=' + req.body.userId,
				function(updateUserErr, user) {
					if (!updateUserErr) {
						if (updateSkills == "true") {
							for (var i = 0; i < req.body.skills.length; i++) {
								connection.query('UPDATE playerSkills SET status=' + req.body.skills[i].intValue + ' WHERE userId=' + req.body.userId + ' AND skillId="' + req.body.skills[i].skillId + '"', function(insertSkillErr, user) {
									if (!insertSkillErr) {
										//console.log('A new skill was registered to the userId: '+userInserted[0].userId+' using the value: '+ req.body.skills[i].intValue ,"");  
									} else {
										res.send({
											"code": 2000,
											"message": "The user was updated but the skills have errors, try to update again!"
										});
										console.log(insertSkillErr);
									}
								});
							}
						} else {
							//res.send({"code": 2000, "message":"The user was updated successfully."});
						}
						res.send({
							"code": 2000,
							"message": "The user was updated successfully."
						});
					} else {
						res.send({
							"code": 1001,
							"message": "The user was not updated, try to update again!"
						});
						console.log(updateUserErr);
					}
				});
		}
		if (updatePass == "false") {
			connection.query('UPDATE user SET email="' + req.body.email + '", firstName="' +
				req.body.firstName + '", lastName="' + req.body.lastName + '", phone="' + req.body.phone + '", birthday="' + req.body.birthday + '", provinceId=' + req.body.provinceId + ', cantonId=' + req.body.cantonId + ' WHERE userId=' + req.body.userId,
				function(updateUserErr, user) {
					if (!updateUserErr) {
						if (updateSkills == "true") {
							for (var i = 0; i < req.body.skills.length; i++) {
								connection.query('UPDATE playerSkills SET status=' + req.body.skills[i].intValue + ' WHERE userId=' + req.body.userId + ' AND skillId="' + req.body.skills[i].skillId + '"', function(insertSkillErr, user) {
									if (!insertSkillErr) {
										//console.log('A new skill was registered to the userId: '+userInserted[0].userId+' using the value: '+ req.body.skills[i].intValue ,"");  
									} else {
										res.send({
											"code": 2001,
											"message": "The user was updated but the skills have errors, try to update again!"
										});
										console.log(insertSkillErr);
									}
								});
							}
						} else {
							//res.send({"code": 2001, "message":"The user was updated successfully."});					
						}
						res.send({
							"code": 2001,
							"message": "The user was updated successfully."
						});
					} else {
						console.log(updateUserErr);
						res.send({
							"code": 1001,
							"message": "The user was not updated, try to update again!"
						});
					}
				});
		}
	});

	//Get Provinces
	getProvinces = function(req, res) {
		connection.query('SELECT * FROM provinces', function(selectProvincesErr, provinces) {
			if (!selectProvincesErr) {
				res.send(provinces);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while getting the provinces, try again!"
				});
				console.log('There are errors while getting the provinces, try again!', selectProvincesErr);
			}
		});
	};

	//Get cantons
	getCantons = function(req, res) {
		connection.query('SELECT * FROM cantons WHERE provinceId=' + req.params.provinceId, function(selectcantonsErr, cantons) {
			if (!selectcantonsErr) {
				res.send(cantons);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while getting the cantons, try again!"
				});
				console.log('There are errors while getting the cantons, try again!', selectcantonsErr);
			}
		});
	};

	//Get My soccercenters
	apiRoutes.get("/soccercenter/:ownerId", function(req, res) {
		connection.query('SELECT * FROM soccercenters WHERE ownerId=' + req.params.ownerId, function(selectSoccerCenterErr, soccercenters) {
			if (!selectSoccerCenterErr) {
				res.send(soccercenters);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while getting the soccercenters, try again!"
				});
				console.log('There are errors while getting the soccercenters, try again!', selectSoccerCenterErr);
			}
		});
	});

	//Register Soccer Center
	apiRoutes.post("/soccercenter", function(req, res) {
		connection.query('INSERT INTO soccercenters (ownerId, name, address, phone, email, openTime, closeTime, provinceId, cantonId) VALUES (' +
			req.body.ownerId + ',"' + req.body.name + '", "' + req.body.address + '", "' + req.body.phone + '", "' + req.body.email + '", "' + req.body.openTime + '", "' + req.body.closeTime + '", "' + req.body.provinceId + '", "' + req.body.cantonId + '")',
			function(insertSoccerCenterErr, soccercenter) {
				if (!insertSoccerCenterErr) {
					var base64Data = req.body.encodedImage;
					if (base64Data != "") {
						require("fs").writeFile("public/images/soccercenter/" + soccercenter.insertId + ".png", base64Data, 'base64', function(err) {

						});
					} else {
						fs.readFile("public/images/soccercenter/default.png", function(err, data) {
							if (err)
								throw err;
							else {
								fs.writeFile("public/images/soccercenter/" + soccercenter.insertId + ".png", data, function(err) {

								});
							}
						});
					}
					res.send(soccercenter);
					//res.send({"code": 2000, "message": "The soccercenter was created successfully."});
				} else {
					res.send({
						"code": 1003,
						"message": "There are errors while creating the soccercenter, try again!"
					});
					console.log('There are errors while creating the soccercenter, try again!', insertSoccerCenterErr);
				}
			});
	});

	//Get Soccer Fields included on specific Team
	apiRoutes.get("/soccercenter/:soccerCenterId/soccerfields", function(req, res) {
		connection.query('SELECT * FROM soccerfields WHERE soccerCenterId=' + req.params.soccerCenterId, function(selectSoccerFieldsErr, soccerfields) {
			if (!selectSoccerFieldsErr) {
				res.send(soccerfields);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while getting the soccerfields, try again!"
				});
				console.log('There are errors while getting the soccerfields, try again!', selectSoccerFieldsErr);
			}
		});
	});

	//Register Soccer Field
	apiRoutes.post("/soccercenter/soccerfield", function(req, res) {
		connection.query('INSERT INTO soccerfields (soccerCenterId, name, openTime, closeTime, status ) VALUES (' +
			req.body.soccerCenterId + ',"' + req.body.name + '", "' + req.body.openTime + '", "' + req.body.closeTime + '",' + req.body.status + ')',
			function(insertSocerFieldErr, soccerfield) {
				if (!insertSocerFieldErr) {
					var base64Data = req.body.encodedImage;
					if (base64Data != "") {
						require("fs").writeFile("public/images/soccerfield/" + soccerfield.insertId + ".png", base64Data, 'base64', function(err) {

						});
					} else {
						fs.readFile("public/images/soccerfield/default.png", function(err, data) {
							if (err)
								throw err;
							else {
								fs.writeFile("public/images/soccerfield/" + soccerfield.insertId + ".png", data, function(err) {

								});
							}
						});
					}
					res.send(soccerfield);
					//res.send({"code": 2000, "message": "The soccerfield was created successfully."});
				} else {
					res.send({
						"code": 1003,
						"message": "There are errors while creating the soccerfield, try again!"
					});
					console.log('There are errors while creating the soccerfield, try again!', insertSocerFieldErr);
				}
			});
	});

	//Get Available Soccer Fields
	apiRoutes.get("/soccerfields/available/:provinceId/:cantonId/:date/:startTime/:endTime", function(req, res) {
		connection.query('SELECT SF.soccerFieldId, SF.soccerCenterId, SC.name soccerCenterName, SF.name FROM soccerfields SF' +
			' INNER JOIN soccercenters SC' +
			' ON SF.soccerCenterId=SC.soccerCenterID' +
			' WHERE SC.provinceId IN (' + req.params.provinceId + ') AND SC.cantonId IN (' + req.params.cantonId + ')' +
			' AND SF.soccerFieldId NOT IN(' +
			' SELECT SF.soccerFieldId FROM soccerfields SF' +
			' INNER JOIN soccercenters SC' +
			' ON SF.soccerCenterId=SC.soccerCenterID' +
			' INNER JOIN soccerfieldsdisponibilityschedule SFDS' +
			' ON SFDS.soccerFieldId=SF.soccerFieldId' +
			' WHERE SC.provinceId IN (' + req.params.provinceId + ')' +
			' AND SC.cantonId IN (' + req.params.cantonId + ')' +
			' AND date="' + req.params.date + '"' +
			' AND (' +
			'(startTime<="' + req.params.startTime + '" AND endTime>"' + req.params.startTime + '")' +
			' OR (startTime<"' + req.params.endTime + '" AND endTime>"' + req.params.endTime + '")' +
			' OR ("' + req.params.startTime + '"<=startTime AND "' + req.params.endTime + '">endTime)' +
			'))' +
			' AND SC.provinceId IN (' + req.params.provinceId + ')' +
			' AND SC.cantonId IN (' + req.params.cantonId + ')' +
			' AND (SF.openTime<="' + req.params.startTime + '" AND SF.closeTime>="' + req.params.startTime + '")' +
			' OR  (SF.openTime<="' + req.params.endTime + '"   AND SF.closeTime>="' + req.params.endTime + '")',
			function(selectSoccerCenterErr, soccercenters) {
				if (!selectSoccerCenterErr) {
					res.send(soccercenters);
				} else {
					res.send({
						"code": 1003,
						"message": "There are errors while getting the soccercenters, try again!"
					});
					console.log('There are errors while getting the soccercenters, try again!', selectSoccerCenterErr);
				}
			});
	});

	//Get Available Soccer Fields
	apiRoutes.get("/soccerfields/:provinceId/:cantonId", function(req, res) {
		// console.log('searching soccer field with the following criteria: '+req.params.provinceId+' - '+req.params.cantonId+' - '+req.params.date);
		connection.query('SELECT SF.soccerFieldId, SF.soccerCenterId, SC.name soccerCenterName, SF.name, SF.openTime, SF.closeTime FROM soccerfields SF' +
			' INNER JOIN soccercenters SC' +
			' ON SF.soccerCenterId=SC.soccerCenterID' +
			' WHERE SC.provinceId IN (' + req.params.provinceId + ') AND SC.cantonId IN (' + req.params.cantonId + ')',
			function(selectSoccerCenterErr, soccercenters) {
				if (!selectSoccerCenterErr) {
					res.send(soccercenters);
				} else {
					res.send({
						"code": 1003,
						"message": "There are errors while getting the soccercenters, try again!"
					});
					console.log('There are errors while getting the soccercenters, try again!', selectSoccerCenterErr);
				}
			});
	});

	//Get Soccer Fields reserved hours by date
	apiRoutes.get("/soccerfield/:soccerFieldId/reservedHours/:date", function(req, res) {
		connection.query('SELECT * FROM soccerfieldsdisponibilityschedule WHERE soccerFieldId=' + req.params.soccerFieldId + ' AND Date="' + req.params.date + '"', function(selectSoccerFieldReservedHoursErr, soccerfieldsReservedHours) {
			if (!selectSoccerFieldReservedHoursErr) {
				res.send(soccerfieldsReservedHours);
			} else {
				res.send({
					"code": 1003,
					"message": "There are errors while getting the soccerfields, try again!"
				});
				console.log('There are errors while getting the soccerfields, try again!', selectSoccerFieldReservedHoursErr);
			}
		});
	});

	app.get("/getApkVersion", verifyApkVersion);
	app.post('/user', registerUser);
	//app.post('/user/activateAccount',activateUserAccount);
	app.get('/user/:email/:password', validateUser);
	//app.get('/user/:userId',userInfo);
	app.get('/user/:skills', searchUser);

	//app.get('/teams',getTeam);
	//app.get('/team/:ownerId',getMyTeam);
	//app.post('/team/create',registerTeam);
	//app.get('/team/delete/:teamId',deleteTeam);
	//app.get('/team/:teamId/players',getTeamPlayers);
	//app.get('/team/delete/:teamId/:playerId',deleteTeamPlayer);
	//app.get('/team/captain/:teamId/:playerId',captainTeam);
	//app.post('/team/:teamId',addTeamPlayer);
	//app.get('/team/playerRequest/:teamPlayerId/:requestStatus',updateTeamPlayerRequest);

	//app.get('/players',getPlayers);
	//app.get('/players/:player',searchPlayer);
	//app.get('/players/:playerId/notificationsCount',getCountNewNotifications);
	//app.get('/players/:playerId/notifications',getNewNotifications);
	//app.get('/players/notificationStatus/:notificationId',updateNotificationStatus);
	//app.get('/players/:playerId/skills',getPlayerSkillsByID);
	//app.get('/players/:playerId/skills/delete/:skillId',deletePlayerSkillById);
	//app.get('/players/:playerId/teams',getTeamsWhereIncluded);

	//app.get('/matches',getMatches);
	//app.post('/matches',registerMatch);
	//app.get('/match/:matchId/:teamId/players',getMatchPlayers);
	//app.get('/match/playerRequest/:matchPlayerId/:requestStatus',updateMatchPlayerRequest);

	app.get('/skills', getSkills);
	app.get('/provinces', getProvinces);
	app.get('/cantons/:provinceId', getCantons);
	/*
	app.get('/user/:email',findUserByEmail);
	*/
	//app.post('/user/:updatePass/:updateSkills',updateUserById);

	/*
	app.get('/sendemail',sendEmail);
	app.get('/sendemail/:listuser/:caller/:date',sendEmailNotification);
	app.get('/serverhour', GetServerHour);
	*/
	app.post('/upload', upload);
	app.post('/uploadbyjson', uploadByJson);
	/*
	app.post('/uploadDish',uploadDish);

	app.get('/verifyCallMade/:date',verifyCallMade);
	app.put('/verifyCallMade/:date',putCallMade);
	*/

	app.use('/api', apiRoutes);

};