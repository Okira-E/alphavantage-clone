const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid.");
                }
            },
        },
        token: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.generateToken = async function () {
    this.token = jwt.sign(
        { id: this._id.toString() },
        "ni7st8pA3MAc_gyr?S1,U\n",
        { expiresIn: "365 days" }
    );
    await this.save();

    return this.token;
};

module.exports = mongoose.model("User", userSchema);
