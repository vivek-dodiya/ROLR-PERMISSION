const express = require('express');
const postRoute = express.Router();

// =============== jwt verification ===============
const verifyToken = require('../../middlewares/authMiddleware');

// =============== Post Validator & Controllers ===============
const { postAddValidator, postDeleteValidator, postUpdateValidator } = require('../../helpers/postValidator');
const addPost = require('../../controllers/commonControllers/postControllers/addPost');
const getPost = require('../../controllers/commonControllers/postControllers/getPost');
const deletePost = require('../../controllers/commonControllers/postControllers/deletePost');
const updatePost = require('../../controllers/commonControllers/postControllers/updatePost');

// =============== Post API ===============
//ApiPath :-    /common/post/add-post
postRoute.post('/add-post', verifyToken, postAddValidator, addPost)

//ApiPath :-    /common/post/get-post
postRoute.get('/get-post', verifyToken, getPost)

//ApiPath :-    /common/post/update-post
postRoute.put('/update-post', verifyToken, postUpdateValidator, updatePost);

//ApiPath :-    /common/post/delete-post
postRoute.delete('/delete-post', verifyToken, postDeleteValidator, deletePost);

module.exports = postRoute