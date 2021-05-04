// app/routes.js
module.exports = function(app) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	
	app.get('/', function(req, res) {
		res.sendFile('/views/index.html', { root: __dirname })// load the index.ejs file
	});

	app.get('/index', function(req, res) {
		res.sendFile('/views/index.html', { root: __dirname })// load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.sendFile('/views/login.html', { root: __dirname })
	});

	
	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.sendFile('/views/register.html', { root: __dirname })
	});

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
