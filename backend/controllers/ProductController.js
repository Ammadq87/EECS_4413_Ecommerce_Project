const express = require("express");
const router = express.Router();

const ProductService = require("../services/ProductService.js");
const verifyToken = require("../config/verifyToken.js");

/** fixed endpoints to be CamelCase (first letter of each word capitalized) */
/** fixed response messages in controller to have res.status().json({ message: message }) to not break the server when error occurs */

router.get("/FetchShoe", async (req, res) => {
  const query = req.query; // Get query params from request

  

  // Checks if query is empty
  if (
    !query.brand &&
    !query.size &&
    !query.name &&
    !query.colour &&
    !query.gender &&
    !query.stock &&
    !query.price &&
    !query.rating &&
    !query.category
  ) {
    res.status(400).json({ message: "No parameters associated with query" });
    return;
  }

  try {
    const shoes = await ProductService.fetchShoes(query); // Forward query params to Product Service
    res.status(200).json(shoes);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get("/FetchAll", async (req, res) => {
  try {
    const shoes = await ProductService.fetchAllShoes();
    res.status(200).json(shoes);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Will have to update to remove the name, size, and colour and just use product id
// The identifier for a shoe is the product id, so we need to find the shoe with that and update accordingly
router.post("/UpdateStock", verifyToken, async (req, res) => {
  const isAdmin = req.user.userData[7];

  if (!isAdmin) {
    res.status(401).json({ message: "You don't have access" });
    return;
  }

  const { product_id, stock } = req.body;

  if (!product_id) {
    res
      .status(400)
      .json({ message: "No product_id for updating stock of shoe" });
    return;
  }

  try {
    if (await ProductService.updateStock({ product_id, stock })) {
      res.status(201).json({ message: "Stock successfully updated" });
    } else {
      res.status(408).json({ message: "Stock not updated" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
