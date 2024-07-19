const express = require("express");
const router = express.Router();

const AdminService = require("../services/AdminService.js");
const { generateToken } = require("../config/generateToken.js");
const verifyToken = require("../config/verifyToken.js");

// Do we want to have a separate login page for admins? Or will the User endpoint have a way of determining if a user logging in is an admin?


router.post("/AddProduct", async (req, res) => {

    const {brand, size, name, colour, gender, stock, price, rating, category} = req.body;

    if (!brand || !size || !name || !colour || !stock || !price) {
        res.status(400);
        res.send("Please enter at least the brand, size, name, colour, stock, and price of the product you want to add");
    }

    try {
        if (await AdminService.addShoe({brand, size, name, colour, gender, stock, price, rating, category})) {
            res.status(201);
            res.send("Shoe successfully added");
        } else {
            res.status(408);
            res.send("Shoe not added");
        }
    } catch (error) {
        throw new Error(error);
    }

});


router.post("/RemoveProduct", async (req, res) => {

    const {brand, size, name, colour, gender, stock, price, rating, category} = req.body;

    if (!size || !name || !colour || !gender) {
        res.status(400);
        res.send("Please enter at least the name, size, colour, and gender of the product you want to delete")
    }

    try {
        if (await AdminService.removeShoe({brand, size, name, colour, gender, stock, price, rating, category})) {
            res.status(201);
            res.send("Shoe successfully removed from DB");
        } else {
            res.status(408);
            res.send("Shoe not removed from DB");
        }
    } catch (error) {
        throw new Error(error);
    }

});


router.post("/UpdateProduct", async (req, res) => {

    /* My thinking is to use 2 JSON objects for update requests, one that can identify the product and one that contains the changes to be made to its entry in the DB:
       {
        "product" : {
         "name" : __
         "size" : __
         "colour" : __
        },
        "update" : {
         "name" : __
         "size" : __
         etc.
        }
       }
    */

    const {product, update} = req.body;

    if (!product.name || !product.size || !product.colour) {                // Values required to find product in the DB (include gender?)
        res.status(400);
        throw new Error("Insufficient info for updating product");
    }

    if (!update) {
        res.status(400);
        throw new Error("No info given to update product with");
    }

    try {
        if (await AdminService.updateShoe({product, update})) {
            res.status(201);
            res.send("Product successfully updated");
        } else {
            res.status(408);
            res.send("Unable to update product");
        }
    } catch (error) {
        throw new Error(error);
    }

});


router.post("/UpdateCustInfo", async (req, res) => {

    const {user, update} = req.body;

    if (!user.email) {
        res.status(400);
        res.send("Insufficient info for updating user");
    }

    if (!update) {
        res.status(400);
        res.send("No info given to update user with");
    }

    try {
        if (await AdminService.updateUser({user, update})) {
            res.status(201);
            res.send("User successfully updated");
        } else {
            res.status(408);
            res.send("Unable to update user");
        }
    } catch (error) {
        throw new Error(error);
    }

});

module.exports = router;