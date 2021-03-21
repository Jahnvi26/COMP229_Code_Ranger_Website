/* File name: business.js
Name: Spandan Patel
Student Id: 301160189
Date: 24/02/2021
ExpressPortfolio - with DB
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

//create reference of Business Controller
let businessController = require('../controllers/business');

//Get route for the Business List Page - Read Operation
router.get('/', businessController.displayBusinessList);

//Get route for display the Add Page - Create Operation
router.get('/add', requireAuth, businessController.displayAddPage);

//Post route for process the Add Page - Create Operation
router.post('/add', requireAuth, businessController.processAddPage);

//Get route for display the Edit Page - Update Operation
router.get('/edit/:id', requireAuth, businessController.displayEditPage);

//Post route for process the Edit Page - Update Operation
router.post('/edit/:id', requireAuth, businessController.processEditPage);

//Get to remove the Contacts - Delete Operation
router.get('/delete/:id', requireAuth, businessController.removeBusiness);

module.exports = router;
