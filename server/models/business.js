/* File name: business.js
Name: Spandan Patel
Student Id: 301160189
Date: 24/02/2021
ExpressPortfolio - with DB
Copyright © 2021 Centennial College. All rights reserved.*/

let mongoose = require('mongoose');

//create model class
let businessModel = mongoose.Schema({
    name: String,
    contact_no : Number,
	email : String
}, 
{
    collection : "business"
});

module.exports = mongoose.model('Business', businessModel);