/* File name: inventory.js
Name: Code Ranger
Student Id: 301160189, 301095154, 301145985
Date: 22/03/2021
E-Commerce Website
Copyright © 2021 Centennial College. All rights reserved.*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let pasport = require('passport');

//helper function for guard purposes
function requireAuth(req, res, next)
{
    //check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

//create reference of Inventory Controller
let inventoryController = require('../controllers/inventory');

//Get route for the Inventory List Page - Read Operation
router.get('/', inventoryController.displayInventoryList);

//Get route for display the Add Page - Create Operation
router.get('/add', requireAuth, inventoryController.displayAddPage);

//Post route for process the Add Page - Create Operation
router.post('/add', requireAuth, inventoryController.processAddPage);

//Get route for display the Edit Page - Update Operation
router.get('/edit/:id', requireAuth, inventoryController.displayEditPage);

//Post route for process the Edit Page - Update Operation
router.post('/edit/:id', requireAuth, inventoryController.processEditPage);

//Get to remove the Items from Inventory - Delete Operation
router.get('/delete/:id', requireAuth, inventoryController.removeItem);

module.exports = router;
