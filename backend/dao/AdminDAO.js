const User = require("../models/UserModel");
const Shoe = require("../models/ProductModel");

class AdminDAO {

    static async addShoe(query) {

        try {
            if (await Shoe.create(query)) {
                return true;
            } else {
                return false;
            }
            
        } catch (error) {
            throw new Error(error);
        }

    }


    static async removeShoe(query) {

        try {
            const removal = await Shoe.deleteOne(query);

            if (removal.deletedCount == 1) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            throw new Error(error);
        }

    }


    static async updateShoe(query) {

        try {

            const update = await Shoe.updateOne({
                name: query.product.name,
                size: query.product.size,
                colour: query.product.colour
            },
                query.update
            );

            if (update.modifiedCount > 0) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            throw new Error(error);
        }

    }


    static async updateUser(query) {

        try {

            const update = await User.updateOne({
                email: query.user.email
            },
                query.update
            );

            if (update.modifiedCount > 0) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            throw new Error(error);
        }

    }

}

module.exports = AdminDAO;