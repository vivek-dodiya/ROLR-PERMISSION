const { validationResult } = require('express-validator');
const RouterPermission = require('../../models/routerPermissionModel')

const addRouterPermission = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const { router_endpoint, role, permission } = req.body;
        const routerPermission = await RouterPermission.findOneAndUpdate(
            { router_endpoint, role },
            { $set: { router_endpoint, role, permission } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        res.status(200).json({
            message: "Router Permission Addd/Update Successfully...",
            data: routerPermission
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


module.exports = addRouterPermission