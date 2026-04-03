const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
router.post("/", upload.single("image"), async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        quantity: req.body.quantity,
        status: req.body.quantity > 0 ? "In Stock" : "Out of Stock",
        image: req.file ? req.file.filename : ""
    });
    await product.save();
    res.json(product);
});
router.get("/", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});
router.delete("/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
});
module.exports = router;