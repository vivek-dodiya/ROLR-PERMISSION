const User = require('../../models/userModel');

const getProfile = async (req, res) => {
    try {
        const user_id = req.user.id;
        const user = await User.findOne({ _id: user_id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            msg: "profil data",
            user
        });
    }
    catch (err) {
        res.status(400).json({ err: err.message })
    }
}

module.exports = getProfile