const User = require('../../../models/userModel');
const Permission = require('../../../models/permissionModel');
const UserPermission = require('../../../models/userPermissionModel');
const { validationResult } = require('express-validator');

const updateUser = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { name, id } = req.body;

        const userExist = await User.findOne({
            _id: id
        });
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        };
        var updateObj = {
            name
        };
        if (req.body.role === 1) {
            return res.status(400).json({ message: "you can not create Admin" })
        } else if (userExist.role === 1) {
            return res.status(400).json({ message: "You Can't Update Admin" })
        }
        else if (req.body.role != undefined || req.body.email != undefined) {
            updateObj.role = req.body.role,
                updateObj.email = req.body.email
        };

        const updatedUser = await User.findByIdAndUpdate(id,
            { $set: updateObj },
            { new: true }
        );
        // Add Permission To User if Comming in Request
        if (req.body.permission != undefined && req.body.permission.length > 0) {
            const addPermission = req.body.permission;
            const permissionsArray = [];

            await Promise.all(addPermission.map(async (permission) => {
                const permissionData = await Permission.findOne({
                    _id: permission.id
                });
                if (!permissionData) {
                    return res.status(400).json({ message: "Permission Not Found" })
                }
                permissionsArray.push({
                    permission_name: permissionData.permission_name,
                    permission_value: permission.value
                })
            }));
            await UserPermission.findOneAndUpdate(
                { user_id: updatedUser._id },
                { $set: { permission: permissionsArray } },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            )
        }

        res.json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(400).json({
            message: 'Error in Update user',
            error: error.message
        })
    }
}
module.exports = updateUser