const Post = require('../../../models/postModel');


const getPost = async (req, res) => {
    try {
        const posts = await Post.find().populate('categories');
        res.status(200).json({
            message: "Post Fatched Sucesssfully...",
            posts  
        });
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
};

module.exports = getPost