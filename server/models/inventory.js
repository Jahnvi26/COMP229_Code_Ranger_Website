/* File name: inventory.js
Name: Code Ranger
Student Id: 301160189, 301095154, 301145985
Date: 22/03/2021
E-Commerce Website
Copyright © 2021 Centennial College. All rights reserved.*/

const { Int32 } = require('bson');
let mongoose = require('mongoose');

//create model class
let itemModel = mongoose.Schema({
    name: String,
    category : String,
	available_stock : Number,
    price : Number
}, 
{
    collection : "inventory"
});

module.exports = mongoose.model('Inventory', itemModel);