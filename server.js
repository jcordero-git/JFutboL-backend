var express = require('express');




/*
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '251188',
  database : 'social_match'
});
*/
var app = express();


app.use(require('connect-dyncache')());

/*
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");  
} else {
    console.log("Error connecting database ... \n\n");  
}
});
*/

/*
mongoose.connect('mongodb://admin:admin@kahana.mongohq.com:10058/foodproviders', function(err,res){
	if(err) console.log('Error en la conexion con Mongo'+ err);
	else console.log('conexion exitosa con Mongo');
});
*/




var allowCrossDomain = function(req, res, next){
      res.header("Access-Control-Allow-Origin", "http://localhost:8080");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELELE");
      res.header("Access-Control-Max-Age", "3600");
	  res.header("Access-Control-Allow-Credentials: true");
      next();
    }

var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var serveStatic = require('serve-static')

  //app.use(bodyParser());
  //app.use(bodyParser.json());
  //app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({limit: '3mb'}));
  app.use(bodyParser.urlencoded({limit: '3mb', extended: false}));

  app.use(methodOverride());
  app.use(express.Router());


//app.configure(function ($httpProvider) {
 
  //app.use(allowCrossDomain);
  //$httpProvider.defaults.useXDomain = true;
    
//});


app.use(serveStatic(process.cwd() + '/public'));

//app = serveStatic('public', {'index': ['index.html', 'index.htm']});


//require('./rutes/rutes')(app);
require('./routes/rutes')(app);



app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
   res.header("Access-Control-Allow-Headers", "Origin, X--With, Content-Type, Accept");   
   // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }

 });
 

//---Middleware: Allows cross-domain requests (CORS)


	

/*
app.all('*', function(req, res,next) {

    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }


});

*/

var port = process.env.PORT || 8080;


app.listen(port, function() {
  console.log("Node server running on http://localhost:"+port);
});
