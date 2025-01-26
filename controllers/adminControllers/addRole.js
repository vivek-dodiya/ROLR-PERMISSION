const Role = require('../../models/roleModel');
const { validationResult } = require('express-validator');

const addRole = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ msg: "Invalid input", error: error.array() });
        }
        const { role_name, value } = req.body;
        const role = await Role.create({
            role_name,
            value
        });
        res.status(201).json({ msg: "Role created successfully", role });
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
};

module.exports = addRole