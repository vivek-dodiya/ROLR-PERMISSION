const User = require('../../../models/userModel')

const getUser = async (req, res) => {
    try {
        // console.log(req.user.id)
        const users = await User.find({
            _id: {
                $ne: req.user.id
            }
        });
        res.status(200).json({ message: "User Fatched Successfully....", users });
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching user',
            error: error.message
        })
    }
}
module.exports = getUser