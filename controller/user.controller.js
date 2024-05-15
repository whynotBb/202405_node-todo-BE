const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10; // 암호화 횟수

const jwt = require("jsonwebtoken");

const userController = {};

userController.createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw new Error("이미 가입된 유저입니다.");
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        console.log("hash", hash);
        const newUser = new User({ email, name, password: hash });
        await newUser.save();
        res.status(200).json({ status: "ok", data: newUser });
    } catch (err) {
        res.status(400).json({ status: "fail", error: err });
    }
};

userController.loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne(
            { email },
            "-createdAt -updatedAt -__v"
        );
        if (user) {
            const isMatch = bcrypt.compareSync(password, user.password); // true
            if (isMatch) {
                const token = user.generateToken();
                return res.status(200).json({ status: "success", user, token });
            }
        }
        throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    } catch (err) {
        res.status(400).json({ status: "fail", err });
    }
};

module.exports = userController;
