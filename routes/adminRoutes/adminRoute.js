const express = require('express');
const adminRoute = express();


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

// =================== All Routes Validator & Controllers ===================
const { addAllRouterPermissionValidator } = require('../../helpers/addAllRouterPermissionValidator');
const getAllallRoutes = require('../../controllers/adminControllers/getAllRoute');
const addRouterPermission = require('../../controllers/adminControllers/addRouterPermission');


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

// =================== AllRoute API ===================
// adminRoute.get('/all-routes', verifyToken, onlyAdminAccess, getAllallRoutes)
adminRoute.post('/add-router-permission', verifyToken, onlyAdminAccess, addAllRouterPermissionValidator, addRouterPermission)

module.exports = adminRoute