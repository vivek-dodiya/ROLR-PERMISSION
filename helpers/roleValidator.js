const { check } = require('express-validator');

exports.roleAddValidator = [
    check('role_name').not().isEmpty().withMessage('role_name is required'),
    check('value').not().isEmpty().withMessage('role_name is required'),
]