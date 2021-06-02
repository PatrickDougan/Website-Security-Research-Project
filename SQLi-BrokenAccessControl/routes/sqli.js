var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/', function(req, res) {
    res.render('sqli');
 });

module.exports = router;