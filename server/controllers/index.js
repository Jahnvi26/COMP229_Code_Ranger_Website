/* File name: index.js
Name: Code Ranger
Student Id: 301160189, 301095154, 301145985
Date: 22/03/2021
E-Commerce Website
Copyright © 2021 Centennial College. All rights reserved.*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

//create User model instance
let userModel = require('../models/user');
let User = userModel.User;


module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title : 'Home', displayName : req.user ? req.user.displayName : ''});
}

module.exports.displayElectronicPage = (req, res, next) => {
    res.render('electronic', {title : 'Electornics Items', displayName : req.user ? req.user.displayName : ''});
}

module.exports.displayFashionPage = (req, res, next) => {
    res.render('fashion', {title : 'Fashions Items', displayName : req.user ? req.user.displayName : ''});
}

module.exports.displaySportPage = (req, res, next) => {
    res.render('sport', {title : 'Sports Items', displayName : req.user ? req.user.displayName : ''});
}

module.exports.displayToyPage = (req, res, next) => {
    res.render('toy', {title : 'Toys Items', displayName : req.user ? req.user.displayName : ''});
}

module.exports.displayBookPage = (req, res, next) => {
    res.render('book', {title : 'Books Items', displayName : req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
    //check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
            title : "Login",
            messages : req.flash('loginMessage'),
            displayName : req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', 
    (err, user, info) => {
        //server error
        if(err)
        {
            return next(err);
        }
        //user login error
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server error
            if(err)
            {
                return next(err);
            }

            const payload =
            {
                id : user._id,
                displayName : user.displayName,
                username : user.username,
                email : user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });

            /*
            res.json({success : true, msg : 'User Logged in Successfully!', user : {
                id : user._id,
                displayName : user.displayName,
                username : user.username,
                email : user.email
            }, token : authToken});*/

            return res.redirect('/inventory-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    //check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title : 'Register',
            messages : req.flash('registerMessage'),
            displayName : req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    //instantiate a user object
    let newUser = new User({
        username : req.body.username,
        email : req.body.emailAddress,
        displayName : req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error : User Already Exists!'
                );
                console.log('Error : User Already Exists!');
            }

            return res.render('auth/register',
            {
                title : 'Register',
                messages : req.flash('registerMessage'),
                displayName : req.user ? req.user.displayName : ''
            });
        }
        else
        {
            /*
            res.json({success : 'User Registered Successfully!'});*/

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/inventory-list');
            })
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}