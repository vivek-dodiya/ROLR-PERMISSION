const express = require('express');
const userRoute = express.Router();

// =============== jwt Verification ===============
const verifyToken = require('../../middlewares/authMiddleware');

// =============== User Validation & controllers ===============
const { createUserValidator } = require('../../helpers/userValidator');
const createUser = require('../../controllers/commonControllers/userControllers/createUser');



// =============== User API ===============
//ApiPath :-    /common/user/create-user
userRoute.post('/create-user',verifyToken, createUserValidator, createUser)

module.exports  = userRoute