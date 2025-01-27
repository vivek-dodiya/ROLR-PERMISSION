const User = require('../../../models/userModel');
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
        } else if (userExist.role === 1 || req.body.role != undefined){
            return res.status(400).json({ message: "You Can't Change Admin's Role" })
        }
        else if (req.body.role != undefined || req.body.email != undefined) {
            updateObj.role = req.body.role,
                updateObj.email = req.body.email
        };

        const updatedUser = await User.findByIdAndUpdate(id,
            { $set: updateObj },
            { new: true }
        );

        res.json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(400).json({
            message: 'Error in Update user',
            error: error.message
        })
    }
}
module.exports = updateUser