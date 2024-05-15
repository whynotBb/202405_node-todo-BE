const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
// 어떤 요청에도 fe로 password는 제공하지 않도록 하는 옵션
userSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.password;

    return obj;
};

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
    //expiresIn ->token 의 유효기간 설정
    return token;
};
const User = mongoose.model("user", userSchema);

module.exports = User;
