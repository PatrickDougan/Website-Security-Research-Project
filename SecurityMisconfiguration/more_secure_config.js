var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'db_connect_user_1',
  password : 't5zLg2Mi$vf',
  database : 'my_schema'
});
connection.connect(function(err){
  if(!err) {
    console.log("Database is connected");
  } else {
    console.log("Error while connecting with database");
  }
});
module.exports = connection;