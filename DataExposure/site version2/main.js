/*  
  Uses express, dbcon for database connection, body parser to parse form data 
  handlebars for HTML templates  
 */

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', 80);
app.set('mysql', mysql);

app.use('/test_site2/bands', require('./bands.js'));
app.use('/test_site2/students', require('./students.js'));
app.use('/test_site2/instruments', require('./instruments.js'));
app.use('/test_site2/music', require('./music.js'));
app.use('/test_site2/student-music', require('./student-music.js'));

app.get('/test_site2/',function(req,res,next){
  var sql = "SELECT id, name, director_fname, director_lname FROM bands";
  var context = {};
  mysql.pool.query(sql, function(err, results, fields){
    if(err){
        next(err);
        return;
      }
    context.bands = results[0];
    res.render('home', context);
    });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
