
const User = require('../models/userModel')
const { GetRouterPermission, GetUserPermission } = require('../helpers/helper')
const checkPermission = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role != 1) {

            const userPermission = await GetUserPermission(req.user.id);
            const routerPermission = await GetRouterPermission(req.path, user.role);

            if (userPermission.permissions.permission == undefined || !routerPermission) {
                return res.status(403).json({ message: 'You do not have permission to access this route' })
            };

            const permission_name = routerPermission.permission_id.permission_name;
            const permission_value = routerPermission.permission;

            const hasPermission = userPermission.permissions.permission.some(permission =>
                permission.permission_name == permission_name && permission.permission_value.some(value => value == permission_value)
            );
            if (!hasPermission) {
                return res.status(403).json({ message: 'You do not have permission to access this route' })
            }
        };
        return next()
    } catch (error) {
        res.status(500).json({ message: 'Somthing Went Wrong...' })
    }
};


module.exports = checkPermission