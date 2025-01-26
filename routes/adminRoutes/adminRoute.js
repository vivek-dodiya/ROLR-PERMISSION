const express = require('express');


//=============== jwt verification ==============
const verifyToken = require('../../middlewares/authMiddleware');


// =================== Permission Validator & Controllers ===================
const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator } = require('../../helpers/adminValidator');
const addPermission = require('../../controllers/adminControllers/addPermission');
const getPermission = require('../../controllers/adminControllers/getPermission');
const deletePermission = require('../../controllers/adminControllers/deletePermission');
const updatePermission = require('../../controllers/adminControllers/updatePermission');
const onlyAdminAccess = require('../../middlewares/adminMiddlewares/onlyAdminAccess');


// =================== Role Validator & Controllers ===================
const { roleAddValidator } = require('../../helpers/roleValidator');
const addRole = require('../../controllers/adminControllers/addRole');
const getRole = require('../../controllers/adminControllers/getRole');

const adminRoute = express.Router();

// =================== Permission API ===================
// ApiPath :-  /admin/add-permission
adminRoute.post('/add-permission', verifyToken, onlyAdminAccess, permissionAddValidator, addPermission)

// ApiPath :-  /admin/get-permission
adminRoute.get('/get-permission', verifyToken, onlyAdminAccess, getPermission)

// ApiPath :-  /admin/update-permission
adminRoute.put('/update-permission', verifyToken, onlyAdminAccess, permissionUpdateValidator, updatePermission)

// ApiPath :-  /admin/delete-permission
adminRoute.delete('/delete-permission', verifyToken, onlyAdminAccess, permissionDeleteValidator, deletePermission)


// =================== Role API ===================
// ApiPath :-  /admin/add-role
adminRoute.post('/add-role', verifyToken, onlyAdminAccess, roleAddValidator, addRole)

// ApiPath :-  /admin/get-role
adminRoute.get('/get-role', verifyToken, onlyAdminAccess, getRole)

module.exports = adminRoute