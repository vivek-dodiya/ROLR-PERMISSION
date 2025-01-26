const express = require('express');
const addCategory = require('../../controllers/commonControllers/categoryControllers/addCategory');
const { categoryAddValidator, categoryDeleteValidator ,categoryUpdateValidator } = require('../../helpers/categoryValidator');
const verifyToken = require('../../middlewares/authMiddleware');
const getCategory = require('../../controllers/commonControllers/categoryControllers/getCategory');
const deleteCategory = require('../../controllers/commonControllers/categoryControllers/deleteCategory');
const updateCategory = require('../../controllers/commonControllers/categoryControllers/updateCategory');
const categoryRoute = express.Router();

//ApiPath :-    /common/category/add-category
categoryRoute.post('/add-category', verifyToken, categoryAddValidator, addCategory);

//ApiPath :-    /common/category/get-category
categoryRoute.get('/get-category', verifyToken, getCategory);

//ApiPath :-    /common/category/update-category
categoryRoute.put('/update-category', verifyToken, categoryUpdateValidator, updateCategory);

//ApiPath :-    /common/category/delete-category
categoryRoute.delete('/delete-category', verifyToken, categoryDeleteValidator, deleteCategory);


module.exports = categoryRoute;