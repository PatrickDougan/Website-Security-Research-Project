var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'volz-database-2.cyku9inmzev6.us-west-2.rds.amazonaws.com',
  user            : 'volz_db_access',
  password        : 'wrZI$4yDg',
  database        : 'volzwebsecdb2'
});

module.exports.pool = pool;
