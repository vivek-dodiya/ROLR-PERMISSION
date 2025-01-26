const Category = require('../../../models/categoryModel');
const { validationResult } = require('express-validator');

const addCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { category_name } = req.body
        const categoryExist = await Category.findOne({
            category_name: {
                $regex: new RegExp(category_name, 'i')
            }
        });
        if (categoryExist) {
            return res.status(400).json({ message: "Category already exist" });
        }
        const category = await Category.create({
            category_name
        });
        res.status(200).json({
            message: "Category Added Successfully",
            category
        });
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}

module.exports = addCategory;