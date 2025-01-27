const express = require('express');
const userRoute = express.Router();

// =============== jwt Verification ===============
const verifyToken = require('../../middlewares/authMiddleware');

// =============== User Validation & controllers ===============
const { createUserValidator, updateUserValidator, deleteUserValidator } = require('../../helpers/userValidator');
const createUser = require('../../controllers/commonControllers/userControllers/createUser');
const getUser = require('../../controllers/commonControllers/userControllers/getUser');
const updateUser = require('../../controllers/commonControllers/userControllers/updateUser');
const deleteUser = require('../../controllers/commonControllers/userControllers/deleteUser');



// =============== User API ===============
//ApiPath :-    /common/user/create-user
userRoute.post('/create-user', verifyToken, createUserValidator, createUser);

//ApiPath :-    /common/user/get-user
userRoute.get('/get-user', verifyToken, getUser);

//ApiPath :-    /common/user/update-user
userRoute.put('/update-user', verifyToken, updateUserValidator, updateUser);

//ApiPath :-    /common/user/delete-user
userRoute.delete('/delete-user', verifyToken, deleteUserValidator, deleteUser);
module.exports = userRoute