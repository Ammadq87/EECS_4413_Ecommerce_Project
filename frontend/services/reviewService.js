import axios from "axios";
import api from "./config";
axios.defaults.withCredentials = true;

export default class ReviewServices {
  static DB = axios.create({ baseURL: `${api}Review/` });

  static async addReview(token, form) {
    try {
      const response = await this.DB.post("AddReview", form, {
        headers: {
          Authorization: token,
        },
      });
      if (response.message) {
        return response.message;
      }
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteReview(token, review_id) {
    try {
      const response = await this.DB.post(
        `DeleteReview/${review_id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.message;
    } catch (err) {
      console.log(err);
    }
  }

  static async getProductReviews(token, product_id) {
    try {
      const response = await this.DB.get(`GetProductReviews/${product_id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.data) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async getUserReviews(token, id) {
    console.log("kajwbdbka");
    try {
      const response = await this.DB.get(`GetUserReviews/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response);
      if (response.data.data) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
}
