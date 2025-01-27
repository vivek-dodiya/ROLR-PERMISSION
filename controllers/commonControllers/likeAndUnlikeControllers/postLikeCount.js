const Like = require('../../../models/likeModel');
const Post = require('../../../models/postModel');
const { validationResult } = require('express-validator');

const postLikeCount = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ msg: "Invalid input", error: error.array() });
        }

        const { post_id } = req.body

        const likes = await Like.find({ post_id }).countDocuments();
        res.json({ msg: "Post Like Count", likes });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = postLikeCount