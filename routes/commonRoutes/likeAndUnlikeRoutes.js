const express = require('express');
const likeUnlikeRoute = express.Router();

//=============== jwt verification ==============
const verifyToken = require('../../middlewares/authMiddleware');


//=============== Category Validator & Controllers ===============
const { postLikeUnlikeValidator, postLikeCountValidator } = require('../../helpers/likeUnlikeValidator');
const postLike = require('../../controllers/commonControllers/likeAndUnlikeControllers/postLike');
const postUnlike = require('../../controllers/commonControllers/likeAndUnlikeControllers/postUnlike');
const postLikeCount = require('../../controllers/commonControllers/likeAndUnlikeControllers/postLikeCount');
const checkPermission = require('../../middlewares/checkPermissionMiddleware');


//  API Path :- /common/like/post-like
likeUnlikeRoute.post('/post-like', verifyToken, checkPermission, postLikeUnlikeValidator, postLike)

//  API Path :- /common/like/post-unlike
likeUnlikeRoute.delete('/post-unlike', verifyToken, checkPermission, postLikeUnlikeValidator, postUnlike)

//  API Path :- /common/like/post-like-count
likeUnlikeRoute.get('/post-like-count', verifyToken, checkPermission, postLikeCountValidator, postLikeCount)
module.exports = likeUnlikeRoute;