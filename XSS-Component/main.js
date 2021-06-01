const express = require('express');
const handlebars = require('express-handlebars')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.engine('hbs', handlebars({
        extname: 'hbs',
        defaultLayout: 'index'
}));
app.set('view engine', 'hbs')

const con = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'commentdb'

});

con.connect(function(Error){
        if(Error){
                throw Error;
        }
});

app.use(express.static('images'));

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false})

app.get('/vuln_component', function(req, res) {
	res.render('page', {title: 'download page', layout: 'page'});
});

app.get('/sec_component', function(req, res) {
	res.render('server', {title: 'download page', layout: 'server'});
});

app.get('/sec_xss', function(req, res)  {
        var sql = "SELECT * FROM comments"
        con.query(sql, function(err, result) {
                if (err) throw err;
		res.setHeader('Content-Type', 'text/html')
		res.render('secure', {ititle: 'secure', layout: 'secure', results: result})
        });
});

app.get('/vuln_xss', function(req, res)  {
        var sql = "SELECT * FROM comments"
        con.query(sql, function(err, result) {
                if (err) throw err;
		res.setHeader('Content-Type', 'text/html')
		res.render('index', {results: result})
        });
        //var context = {kids: 'hello world'}
        //res.render('index', context)
        //res.sendFile('/home/cody/Documents/index.html');
});

app.post('/vuln', urlencodedParser,  function(req, res) {
        var body = req.body;
        var sql = "INSERT INTO comments (name, email, comment) VALUES ('"+body.name+"','"+body.email+"','"+body.comment+"')";
        con.query(sql, function (err, result) {
                if (err) throw err;
                res.redirect('/vuln_xss');
        });
});

app.post('/sec', urlencodedParser,  function(req, res) {
        var body = req.body;
        var sql = "INSERT INTO comments (name, email, comment) VALUES ('"+body.name+"','"+body.email+"','"+body.comment+"')";
        con.query(sql, function (err, result) {
                if (err) throw err;
                res.redirect('/sec_xss');
        });
});


app.listen(port, () => {
        console.log("sample running");
});
