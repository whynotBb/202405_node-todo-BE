const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
app.use(bodyParser.json());
app.use(cors());
app.use("/api", indexRouter);

const mongoURI = MONGODB_URI_PROD;

mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log("mongoose connect"))
    .catch((err) => {
        console.log("DB connection fail", err);
    });

app.listen(process.env.PORT || 5000, () => {
    console.log("server on 5000");
});

// 2. 로그인
// - 이메일, 패스워드 입력해서 보냄
// - 데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
// - 없으면 로그인 실패 , 있다면 유저정보 + 토큰 보내주기
// - FE 에서는 이 정보를 저장한다.
// ㄱ. 라우터설정
// ㄴ. 이메일 패스워드 정보 읽어오기
// ㄷ. 이메일 정보를 이용하여 유저 찾기
// ㄹ. 이 유저 db에 있는 패스워드와 FE에서 보낸 패스워드가 일치하는지 비교
// ㅁ. 맞으면, 토큰발행 , 틀리면 에러메시지 보냄
// ㅂ. 응답으로 유저정보 + 토큰

// 1. 회원가입
// 유저가 이메일, 패스워드, 유저이름 입력해서 보낸다.
// 받은 정보를 저장 (데이터베이스 모델 필요)
// 패스워드는 암호화시켜서 저장한다. (라이브러리이용)

// 1. 라우터
// 2. 모델
// 3. 데이터를 저장 (중복가입판단, 패스워드 암호화)
// 4. 응답 보낸다.
