/* File name: user.js
Name: Spandan Patel
Student Id: 301160189
Date: 28/02/2021
ExpressPortfolio - with DB
Copyright © 2021 Centennial College. All rights reserved.*/

//require modules for the User model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema
(
    {
        username:
        {
            type: String,
            default: "",
            trim: true,
            required: "Username is required"
        },
        email:
        {
            type: String,
            default: "",
            trim: true,
            required: "Email address is required"
        },
        displayName:
        {
            type: String,
            default: "",
            trim: true,
            required: "Display name is required"
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        updated:
        {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "users"
    }
);

//configure options for User model
let option = ({ missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, option);

module.exports.User = mongoose.model('User', User);