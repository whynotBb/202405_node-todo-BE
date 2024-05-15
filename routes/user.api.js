const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

// 1. 회원가입 endpoint
router.post("/", userController.createUser);
// 2. 로그인
// get 은 request.body 를 이용할 수 없고, url 에 데이터를 보낼 수 있다.
// 로그인의 경우, 이메일과 패스워드 데이터를 보내야 하므로 url에 보내는 것은 위험
// 따라서 post 로
router.post("/login", userController.loginWithEmail);

module.exports = router;
