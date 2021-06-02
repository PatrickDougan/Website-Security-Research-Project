var express = require('express');
var router = express.Router();
var db=require('../database');

router.post('/', function(req, res, next) {
	var username = req.body.username;
    var sql = "SELECT id,username,email FROM accounts WHERE username='" + username + "'";
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('results', { title: 'Username Search Results', usernameData: data});
  });
});

module.exports = router;