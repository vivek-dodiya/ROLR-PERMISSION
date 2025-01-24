const express = require('express');
const authRoute = express.Router();
const {registerValidator, loginValidator} = require('../../helpers/authValidator');
const registerUser = require('../../controllers/authController/registerUser');
const loginUser = require('../../controllers/authController/loginUser');
const getProfile = require('../../controllers/authController/getProfile');
const verifyToken = require('../../middlewares/authMiddleware');

//ApiPath :-    /auth/register
authRoute.post('/register',registerValidator, registerUser);

//ApiPath :-    /auth/login
authRoute.post('/login',loginValidator,loginUser);

//ApiPath :-    /auth/profile
authRoute.get('/profile', verifyToken, getProfile);
module.exports = authRoute;
