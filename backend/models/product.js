const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    quantity: Number,
    status: String,
    image: String
});

module.exports = mongoose.model("Product", productSchema);