/* File name: user.js
Name: Code Ranger
Student Id: 301160189, 301095154, 301145985
Date: 22/03/2021
E-Commerce Website
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
        money:
        {
            type: Number,
            default: 0.0
        },
        wishlist:
        {
            //change later to multi dimensional array or array of obejects of inventory class
            type: Array,
            default: []

        },
        orderHistory:
        {
            //change later to multi dimensional array or array of obejects of inventory class
            type: Array,
            default: []
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