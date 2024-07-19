const AdminDAO = require("../dao/AdminDAO.js");

class AdminService {

    static async addShoe({brand, size, name, colour, gender, stock, price, rating, category}) {
        const shoeFilter = {};

        if (brand) {
            shoeFilter.brand = brand;
        }

        if (size) {
            shoeFilter.size = Number(size);
        }

        if (name) {
            shoeFilter.name = name;
        }

        if (colour) {
            shoeFilter.colour = colour;
        }

        if (gender) {
            shoeFilter.gender = gender;
        }

        if (stock) {
            shoeFilter.stock = Number(stock);
        }

        if (price) {
            shoeFilter.price = Number(price);
        }

        if (rating) {
            shoeFilter.rating = Number(rating);
        }

        if (category) {
            shoeFilter.category = category;
        }

        return await AdminDAO.addShoe(shoeFilter);

    }


    static async removeShoe({brand, size, name, colour, gender, stock, price, rating, category}) {
        const shoeFilter = {};

        if (brand) {
            shoeFilter.brand = brand;
        }

        if (size) {
            shoeFilter.size = Number(size);
        }

        if (name) {
            shoeFilter.name = name;
        }

        if (colour) {
            shoeFilter.colour = colour;
        }

        if (gender) {
            shoeFilter.gender = gender;
        }

        if (stock) {
            shoeFilter.stock = stock;
        }

        if (price) {
            shoeFilter.price = Number(price);
        }

        if (rating) {
            shoeFilter.rating = Number(rating);
        }

        if (category) {
            shoeFilter.category = category;
        }

        return AdminDAO.removeShoe(shoeFilter);

    }


    static async updateShoe({product, update}) {

        const filteredQuery = {product, update};

        filteredQuery.product.name = product.name;
        filteredQuery.product.size = product.size;
        filteredQuery.product.colour = product.colour;

        if (update.brand) {
            filteredQuery.update.brand = update.brand;
        }

        if (update.name) {
            filteredQuery.update.name = update.name;
        }

        if (update.size) {
            filteredQuery.update.size = Number(update.size);
        }

        if (update.colour) {
            filteredQuery.update.colour = update.colour;
        }

        if (update.gender) {
            filteredQuery.update.gender = update.gender;
        }

        if (update.stock) {
            filteredQuery.update.stock = Number(update.stock);
        }

        if (update.price) {
            filteredQuery.update.price = Number(update.price);
        }

        if (update.rating) {
            filteredQuery.update.rating = Number(update.rating);
        }

        if (update.category) {
            filteredQuery.update.category = update.category;
        }

        return await AdminDAO.updateShoe(filteredQuery);

    }


    static async updateUser({user, update}) {

        const filteredQuery = {user, update};

        filteredQuery.user.email = user.email;

        if (update.email) {
            filteredQuery.update.email = update.email;
        }

        /*
        if (update.password) {
            // Would need to use bcrypt to hash/salt updated password I think
        }
        */

        if (update.first_name) {
            filteredQuery.update.first_name = update.first_name;
        }

        if (update.last_name) {
            filteredQuery.update.last_name = update.last_name;
        }

        if (update.address) {
            filteredQuery.update.address = update.address;
        }

        return await AdminDAO.updateUser(filteredQuery);

    }


}

module.exports = AdminService;