const { check } = require('express-validator');

exports.addAllRouterPermissionValidator = [
    check('router_endpoint').not().isEmpty().withMessage('router_endpoint is required'),
    check('role').not().isEmpty().withMessage('role is required'),
    check('permission').isArray().withMessage('permission must be an Array'),
]
exports.getRouterPermissionValidator = [
    check('router_endpoint').not().isEmpty().withMessage('router_endpoint is required'),
]