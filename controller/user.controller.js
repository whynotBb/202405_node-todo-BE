const User = require("../model/User");

const userController = {};

userController.createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw new Error("이미 가입된 유저입니다.");
        } else {
        }
    } catch (err) {}
};

module.exports = userController;
