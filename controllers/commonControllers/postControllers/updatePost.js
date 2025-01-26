const Post = require('../../../models/postModel')
const { validationResult } = require('express-validator');

const updatePost = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ msg: "Invalid input", error: error.array() });
        }
        const { id, title, description } = req.body;
        const postExist = await Post.findById(id);
        if (!postExist) {
            return res.status(404).json({ msg: "Post not found" });
        }
        var postObj = {
            title,
            description
        }
        if(req.body.categories){
            postObj.categories = req.body.categories;
        }
        const updatedPost = await Post.findByIdAndUpdate(id,{ $set: postObj}, { new: true });
        res.json({ msg: "Post updated successfully", updatedPost });
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}
module.exports = updatePost