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

// create a reference to model
let Inventory = require('../models/inventory');

module.exports.displayInventoryList = (req, res, next) => {
    Inventory.find((err, inventoryList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('inventory/list', {title:'Inventory', InventoryList: inventoryList, displayName: req.user ? req.user.displayName : ''});
        }
    }).sort({"price" : 1});
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('inventory/add', {title:'Add New Item in Inventory', displayName: req.user ? req.user.displayName : ''});
}

module.exports.processAddPage = (req, res, next) => {
    let newItem = Inventory({
        "name" : req.body.name,
        "category": req.body.category,
        "available_stock": req.body.available_stock,
        "price": req.body.price
    });

    Inventory.create(newItem, (err, Inventory) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the inventorylist
            res.redirect('/inventory-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Inventory.findById(id, (err, itemToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show edit view
            res.render('inventory/edit', {title: 'Edit Item from Inventory', inventory: itemToEdit, displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedInventory = Inventory({
        "_id": id,
        "name": req.body.name,
        "category": req.body.category,
        "available_stock": req.body.available_stock,
        "price": req.body.price
    });

    Inventory.updateOne({ _id : id}, updatedInventory, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh inventory list
            res.redirect('/inventory-list');
        }
    });
}

module.exports.removeItem = (req, res, next) => {
    let id = req.params.id;

    Inventory.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh inventory list
            res.redirect('/inventory-list');
        }
    });
}