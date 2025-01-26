const Post = require('../../../models/postModel')
const { validationResult } = require('express-validator');

const addPost = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ msg: "Invalid input", error: error.array() });
        }
        const { title, description } = req.body;
        var postObj = {
            title,
            description
        }
        if (req.body.categories) {
            postObj.categories = req.body.categories;
        }
        const post = await Post.create(postObj);
        const categoriesPopulate =  await Post.findOne({_id : post._id}).populate('categories')
        res.status(201).json({ msg: "Post created successfully", post : categoriesPopulate });
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}

module.exports = addPost