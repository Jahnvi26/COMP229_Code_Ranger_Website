/* File name: index.js
Name: Spandan Patel
Student Id: 301160189
Date: 28/02/2021
ExpressPortfolio - with DB
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

module.exports.displayServicePage = (req, res, next) => {
    res.render('services', { title: 'Services', displayName : req.user ? req.user.displayName : ''});
}

module.exports.displayProjectPage = (req, res, next) => {
    res.render('projects', { title: 'Projects', displayName : req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', { title: 'Contact', displayName : req.user ? req.user.displayName : ''});
}

module.exports.displayInfoPage = (req, res, next) => {
    res.render('info', {title: 'Info', displayName : req.user ? req.user.displayName : ''});
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

            return res.redirect('/business-list');
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
                res.redirect('/business-list');
            })
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}