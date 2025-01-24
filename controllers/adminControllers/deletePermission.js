const Permission =  require('../../models/permissionModel')
const { validationResult } = require('express-validator');

const deletePermission = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { id } = req.body;
        const permission = await Permission.findByIdAndDelete(id);
        if (!permission) {
            return res.status(404).json({ message: "Permission not found" });
        }
        res.json({ message: "Permission deleted successfully" });
    } catch (err) {
        res.status(400).json({
            message: "Error delete Permission",
            error: err.message
        })
    }
}

module.exports = deletePermission