/* File name: user.js
Name: Code Ranger
Student Id: 301160189, 301095154, 301145985
Date: 22/03/2021
E-Commerce Website
Copyright © 2021 Centennial College. All rights reserved.*/


var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
