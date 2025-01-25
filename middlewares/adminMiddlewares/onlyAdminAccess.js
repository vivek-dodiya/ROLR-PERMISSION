
const User = require('../../models/userModel')

const onlyAdminAccess = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        if (user.role != 1) {
            return res.status(403).json({ msg: "You Nave Not Permission To Access This" })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Somthing Want Wrong...",
            error: error.message
        })
    }
};


module.exports = onlyAdminAccess