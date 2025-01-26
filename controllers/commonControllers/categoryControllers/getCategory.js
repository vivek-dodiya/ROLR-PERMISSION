const Category = require('../../../models/categoryModel');

const getCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            message: "Category Fetched Successfuly....",
            categories
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = getCategory