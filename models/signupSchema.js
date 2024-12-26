const mongoose = require("mongoose");

const userSignupSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Ensures username is provided
        unique: true, // Ensures no duplicate usernames
        trim: true, // Removes any leading/trailing whitespace
    },
    password: {
        type: String,
        required: true, // Ensures password is provided
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model("UserSignup", userSignupSchema);
