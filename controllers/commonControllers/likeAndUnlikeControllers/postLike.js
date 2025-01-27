const Like = require('../../../models/likeModel');
const User = require('../../../models/userModel');
const Post = require('../../../models/postModel');
const { validationResult } = require('express-validator');

const postLike = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ msg: "Invalid input", error: error.array() });
        }
        const { user_id, post_id } = req.body

        const userExist = await User.findOne(
            { _id: user_id }
        );
        if (!userExist) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        const postExist = await Post.findOne(
            { _id: post_id }
        );
        if (!postExist) {
            return res.status(400).json({ msg: "Post does not exist" });
        }

        const likeExist = await Like.findOne({
            user_id,
            post_id
        });
        if (likeExist) {
            return res.status(400).json({ msg: "You have already liked this post" });
        }
        const like = await Like.create({
            user_id,
            post_id
        });
        res.json({ msg: "Post Like successfully", like });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = postLike