const Permission = require('../../models/permissionModel')
const { validationResult } = require('express-validator')

const addPermission = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { permission_name } = req.body
        const existPermission = await Permission.findOne({
            permission_name: {
                $regex: new RegExp(permission_name, 'i')
            }
        })
        if (existPermission) {
            return res.status(400).json({ message: "Permission already exist" })
        }
        var obj = {
            permission_name
        };

        if (req.body.default != null) {
            obj.is_default = parseInt(req.body.default)
        }
        const permission = await Permission.create(
            obj
        );
        res.status(201).json({ message: "Permission created successfully", permission });
    }
    catch (err) {
        res.status(400).json({
            message: "Error adding permission",
            error: err.message
        })
    }
}

module.exports = addPermission;