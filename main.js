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
        user: 'newuser',
        password: 'password',
        database: 'commentdb'

});

con.connect(function(Error){
        if(Error){
                throw Error;
        }
});


var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false})


app.get('/', function(req, res)  {
        var sql = "SELECT * FROM comments"
        con.query(sql, function(err, result) {
                if (err) throw err;
                res.render('index', {results: result})
        });
        //var context = {kids: 'hello world'}
        //res.render('index', context)
        //res.sendFile('/home/cody/Documents/index.html');
});

app.post('/', urlencodedParser,  function(req, res) {
        var body = req.body;
        var sql = "INSERT INTO comments (name, email, comment) VALUES ('"+body.name+"','"+body.email+"','"+body.comment+"')";
        con.query(sql, function (err, result) {
                if (err) throw err;
                res.redirect('/');
                //console.log("Number of records insertd: " + result.affectedRows);
        });
});

app.listen(port, () => {
        console.log("sample running");
});
     

On Mon, May 3, 2021 at 10:08 PM Dougan, Patrick <douganp@oregonstate.edu> wrote:
