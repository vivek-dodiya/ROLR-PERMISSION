const { check } = require('express-validator');

exports.permissionAddValidator = [
    check('permission_name').not().isEmpty().withMessage('permission_name is required'),
]
exports.permissionDeleteValidator = [
    check('id').not().isEmpty().withMessage('id is required'),
]
exports.permissionUpdateValidator = [
    check('id').not().isEmpty().withMessage('id is required'),
    check('permission_name').not().isEmpty().withMessage('permission_name is required')
]