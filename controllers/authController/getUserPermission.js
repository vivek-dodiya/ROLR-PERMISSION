const User = require('../../models/userModel');
const GetUserPermission = require('../../helpers/helper')

const getUserPermission = async (req, res) => {
    try {
        const user_id = req.user.id;
        const UserPermission = await GetUserPermission(user_id);
        res.status(200).json({
            msg: "profil data",
            UserPermission
        });
    }
    catch (err) {
        res.status(400).json({ err: err.message })
    }
}

module.exports = getUserPermission