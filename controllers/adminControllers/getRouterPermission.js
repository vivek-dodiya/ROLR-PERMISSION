const { validationResult } = require('express-validator');
const RouterPermission = require('../../models/routerPermissionModel')
const getRouterPermission = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array() });
        }
        const { router_endpoint } = req.body;
        const routerPermission = await RouterPermission.find({
            router_endpoint: router_endpoint
        }).populate('permission_id');
        if (!routerPermission) {
            return res.status(404).json({ message: 'Router Permission Not Found' });
        }
        return res.status(200).json({
            message: 'Router Permission',
            routerPermission
        });

    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

module.exports = getRouterPermission