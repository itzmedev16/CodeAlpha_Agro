const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/agro")
.then(() => console.log("DB connected"))
.catch(err => console.log(err));
app.get("/", (req, res) => {
    res.send("Server running");
});
const productRoutes = require("./routes/productroutes");
const userRoutes = require("./routes/userroutes");
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/uploads", express.static("uploads"));
app.listen(5000, () => {
    console.log("Server started on port 5000");
});
