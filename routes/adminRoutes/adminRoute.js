const express = require('express');
const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator } = require('../../helpers/adminValidator');
const addPermission = require('../../controllers/adminControllers/addPermission');
const verifyToken = require('../../middlewares/authMiddleware');
const getPermission = require('../../controllers/adminControllers/getPermission');
const deletePermission = require('../../controllers/adminControllers/deletePermission');
const updatePermission = require('../../controllers/adminControllers/updatePermission');
const adminRoute = express.Router();

// ApiPath :-  /admin/add-permission
adminRoute.post('/add-permission', verifyToken, permissionAddValidator, addPermission)

// ApiPath :-  /admin/get-permission
adminRoute.get('/get-permission', verifyToken, getPermission)

// ApiPath :-  /admin/update-permission
adminRoute.put('/update-permission', verifyToken, permissionUpdateValidator, updatePermission)

// ApiPath :-  /admin/delete-permission
adminRoute.delete('/delete-permission', verifyToken, permissionDeleteValidator, deletePermission)
module.exports = adminRoute