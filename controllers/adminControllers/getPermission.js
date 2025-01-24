const Permission = require('../../models/permissionModel')
const getPermission = async (req, res) => {
    try {
        const permissions = await Permission.find()
        res.status(200).json({
            message: "Permissions Fatched Sucesssfully...",
            permissions
        });
    } catch (err) {
        res.status(400).json({
            message: "Error adding permission",
            error: err.message
        })
    }
}

module.exports = getPermission