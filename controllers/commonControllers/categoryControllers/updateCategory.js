const Category = require('../../../models/categoryModel');
const { validationResult } = require('express-validator');

const updateCategory = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const { id, category_name } = req.body;
        const categoryExist = await Category.findOne({ _id: id });
        if (!categoryExist) {
            return res.status(404).json({ message: "Category not found" });
        }
        const isCategoryNameExist = await Category.findOne({
            _id: { $ne: id },
            category_name: {
                $regex: category_name, $options: 'i'
            }
        });
        if (isCategoryNameExist) {
            return res.status(400).json({ message: "Category Name Already Assigned To Another Category" });
        }
        const category = await Category.findByIdAndUpdate(id,
            { $set: { category_name } },
            { new: true }
        );
        res.status(200).json({
            message: "Category updated successfully",
            category
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = updateCategory