const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

class UserDAO {
  // get user related stuff from mongo here

  // NOTE -- pass parameters as objects: {...}

  static async checkUserExists(email) {
    const userExists = await User.findOne({ email: email });
    return userExists;
  }

  /**
   * @returns User
   */
  static async registerUser(email, password, first_name, last_name, address) {
    const hashed_password = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed_password,
      first_name,
      last_name,
      address,
    });

    if (user) {
      return user;
    } else {
      throw new Error("Invalid user data");
    }
  }

  static async validateLogin(email, password) {
    const user = await this.checkUserExists(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new Error("Invalid Login Credentials");
    }
  }
}

module.exports = UserDAO;
