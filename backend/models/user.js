const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    dob: String,
    country: String,
    state: String,
    city: String,
    address: String,
    role: {
        type: String,
        default: "user"
    }
});

module.exports = mongoose.model("User", userSchema);