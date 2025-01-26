const Role = require('../../models/roleModel');

const getRole = async (req, res) => {
    try {
        const roles = await Role.find({
            value: {
                $ne: 1
            }
        });
        res.status(200).json({
            message: "Roles Fatched Sucesssfully...",
            roles
        });
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
};

module.exports = getRole