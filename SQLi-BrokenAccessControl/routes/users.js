var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/', function(req, res, next) {
    var sql='SELECT * FROM accounts';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('users', { title: 'User List', userData: data});
  });
});
module.exports = router;