const express = require('express');
const authRoute = express.Router();
const {registerValidator} = require('../../helpers/validator');
const registerUser = require('../controllers/registerUser');

authRoute.post('/register',registerValidator, registerUser)

module.exports = authRoute;
