const User = require('../../../models/userModel');
const { validationResult } = require('express-validator');

const deleteUser = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { id } = req.body;

        const userExist = await User.findOne({
            _id: id
        });
        if (!userExist) {
            return res.status(404).json({ message: "User not Found!!!" });
        }
        else if (userExist.role === 1) {
            return res.status(403).json({
                message: "You can't delete this user!!!"
            })
        }

        const deletedUser = await User.findByIdAndDelete(id);

        res.json({ message: "User Deleated successfully", deletedUser });
    } catch (error) {
        res.status(400).json({
            message: 'Error in Delete user',
            error: error.message
        })
    }
}
module.exports = deleteUser