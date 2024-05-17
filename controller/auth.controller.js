const authController = {};
const jwt = require('jsonwebtoken');

//env 파일 읽어오기
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization; // Bearer lsdkfjlsdfkj => Bearer 빼줘야함
        if (!tokenString) {
            throw new Error('invalid token');
        }
        const token = tokenString.replace('Bearer ', '');
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if (error) {
                throw new Error('invalid token');
            }
            console.log('payload -- ', payload); // payload --  { _id: '6645c3613bdea8f500e42f0a', iat: 1715919293, exp: 1716005693 }
            // auth controller 에서는 auth 에 대한것만 판단하고, user 정보는 user.controller 에서 다루는 것이 좋다. 재사용을 위해
            // res.status(200).json({status: 'success', userId: payload._id});
            // req 에 추가해줄수 있음 => next 에서 받는 컨트롤러가 사용할 id 정보
            req.userId = payload._id;
        });
        next();
    } catch (error) {
        res.status(400).json({status: 'fail', message: error.message});
    }
};

module.exports = authController;

// 미들웨어
