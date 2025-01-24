const Permission = require('../../models/permissionModel')
const { validationResult } = require('express-validator');

const updatePermission = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { permission_name, id } = req.body
        const permissionExist = await Permission.findOne({ _id: id })
        if (!permissionExist) {
            return res.status(404).json({ message: "Permission not found" })
        }
        const iaNameExist = await Permission.findOne({
            _id: { $ne: id },
            permission_name
        });
        if (iaNameExist) {
            return res.status(400).json({ message: "Permission name already exists" })
        }
        var updatepermission = {
            permission_name
        }
        if (req.body.default != null) {
            updatepermission.default = parseInt(req.body.default)
        }
        const updatedPermission = await Permission.findByIdAndUpdate(
            id,
            { $set: updatepermission },
            { new: true }
        )
        res.status(200).json({ message: "Permission updated successfully", updatedPermission })
    }
    catch (err) {
        res.status(400).json({
            message: "Error to Update Permission",
            error: err.message
        })
    }
}

module.exports = updatePermission