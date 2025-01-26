const express = require('express');
const { postAddValidator } = require('../../helpers/postValidator');
const verifyToken = require('../../middlewares/authMiddleware');
const addPost = require('../../controllers/commonControllers/postControllers/addPost');
const getPost = require('../../controllers/commonControllers/postControllers/getPost');
const postRoute = express.Router();

//ApiPath :-    /common/post/add-post
postRoute.post('/add-post', verifyToken, postAddValidator, addPost)

//ApiPath :-    /common/post/get-post
postRoute.get('/get-post', verifyToken, getPost)
module.exports = postRoute