const mongoose = require("mongoose");

const shoeDetailSchema = new mongoose.Schema({
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
});

const cartSchema = mongoose.Schema(
  {
    shoes: {
      type: Map,
      of: shoeDetailSchema,
      required: false,
    },
  },
  { collection: "carts" }
);

module.exports = mongoose.model("Cart", cartSchema);
