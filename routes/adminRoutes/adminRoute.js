const express = require('express');
const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator } = require('../../helpers/adminValidator');
const addPermission = require('../../controllers/adminControllers/addPermission');
const verifyToken = require('../../middlewares/authMiddleware');
const getPermission = require('../../controllers/adminControllers/getPermission');
const deletePermission = require('../../controllers/adminControllers/deletePermission');
const updatePermission = require('../../controllers/adminControllers/updatePermission');
const onlyAdminAccess = require('../../middlewares/adminMiddlewares/onlyAdminAccess');
const adminRoute = express.Router();

// ApiPath :-  /admin/add-permission
adminRoute.post('/add-permission', verifyToken, onlyAdminAccess, permissionAddValidator, addPermission)

// ApiPath :-  /admin/get-permission
adminRoute.get('/get-permission', verifyToken, onlyAdminAccess, getPermission)

// ApiPath :-  /admin/update-permission
adminRoute.put('/update-permission', verifyToken, onlyAdminAccess, permissionUpdateValidator, updatePermission)

// ApiPath :-  /admin/delete-permission
adminRoute.delete('/delete-permission', verifyToken, onlyAdminAccess, permissionDeleteValidator, deletePermission)
module.exports = adminRoute