const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Permission = require('../../models/permissionModel');
const UserPermission = require('../../models/userPermissionModel');


const registerUser = async (req, res) => {
    try {
        const err = validationResult(req)
        if (!err.isEmpty()) {
            return res.status(200).json({ msg: err.array() });
        }
        const { name, email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(200).json({ msg: "User already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        // Assigned Default Permission
        const defaultPermission = await Permission.find({
            is_default: 1
        });
        if (defaultPermission.length > 0) {
            const permissionArray = [];
            defaultPermission.forEach((permission) => {
                permissionArray.push({
                    permission_name: permission.permission_name,
                    permission_value: [0, 1, 2, 3]
                })
            });
            const userPermission = await UserPermission.create({
                user_id: user._id,
                permission: permissionArray
            });
        }
        res.status(201).json({ message: "user Register Successfuly...", user })
    }
    catch (err) {
        res.status(400).json({ err: err.message })
    }
}
module.exports = registerUser;