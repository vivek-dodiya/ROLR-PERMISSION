const express = require('express');
const categoryRoute = express.Router();

//=============== jwt verification ==============
const verifyToken = require('../../middlewares/authMiddleware');


//=============== Category Validator ===============
const { categoryAddValidator, categoryDeleteValidator, categoryUpdateValidator } = require('../../helpers/categoryValidator');
const addCategory = require('../../controllers/commonControllers/categoryControllers/addCategory');
const getCategory = require('../../controllers/commonControllers/categoryControllers/getCategory');
const deleteCategory = require('../../controllers/commonControllers/categoryControllers/deleteCategory');
const updateCategory = require('../../controllers/commonControllers/categoryControllers/updateCategory');
const checkPermission = require('../../middlewares/checkPermissionMiddleware');

//=============== Category API ===============
//ApiPath :-    /common/category/add-category
categoryRoute.post('/add-category', verifyToken, checkPermission, categoryAddValidator, addCategory);

//ApiPath :-    /common/category/get-category
categoryRoute.get('/get-category', verifyToken, checkPermission, getCategory);

//ApiPath :-    /common/category/update-category
categoryRoute.put('/update-category', verifyToken, checkPermission, categoryUpdateValidator, updateCategory);

//ApiPath :-    /common/category/delete-category
categoryRoute.delete('/delete-category', verifyToken, checkPermission, categoryDeleteValidator, deleteCategory);

module.exports = categoryRoute;