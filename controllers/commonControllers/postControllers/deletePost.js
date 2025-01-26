const Post = require('../../../models/postModel')
const { validationResult } = require('express-validator');

const deletePost = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const {id} = req.body;
        const postExist = await Post.findById( id );
        if (!postExist) {
            return res.status(404).json({ message: "Post not found" });
        }
        const deletedPost = await Post.findByIdAndDelete(id);
        res.status(200).json({ message: "Post deleted successfully", deletedPost });
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}

module.exports = deletePost