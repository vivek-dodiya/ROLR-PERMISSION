const Category = require('../../../models/categoryModel');

const { validationResult } = require('express-validator');


const deleteCategory = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const { id } = req.body;
        const isIdExist = await Category.findOne({_id : id});
        if (!isIdExist) {
            return res.status(404).json({ error: "Category not found" });
        }
        const category = await Category.findByIdAndDelete(id);
        res.status(200).json({ message: "Category deleted successfully" , category });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = deleteCategory