    var express=require("express");
    var bodyParser=require('body-parser');
    var app = express();
    var path    = require("path");
    
    // app.set('views','/views');
    var authenticateController=require('./controllers/loginController');
    var registerController=require('./controllers/registerController');
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    
    // app.use(express.static(__dirname + '/views'));
    require('./routes.js')(app); // load our routes and pass in our app and fully configured passport


    /* route to handle login and registration */
    app.post('/api/register',registerController.register);
    app.post('/api/authenticate',authenticateController.authenticate);
    // app.get('/','/views/index.html');
    app.listen(8012);