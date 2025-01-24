const { check } = require('express-validator');

exports.registerValidator = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().normalizeEmail({gmail_remove_dots: true}).withMessage('email required'),
    check('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters')
];

exports.loginValidator = [
    check('email').isEmail().normalizeEmail({gmail_remove_dots: true}).withMessage('email required'),
    check('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters')
]