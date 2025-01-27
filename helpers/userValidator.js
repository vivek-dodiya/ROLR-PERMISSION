const { check } = require('express-validator');

exports.createUserValidator = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().normalizeEmail(
        {
            allDomains: true,
            removeDuplicateSpaces: true,
            gmail_remove_dots: true
        }
    ).withMessage('Please enter a valid email'),
]
exports.updateUserValidator = [
    check('id').not().isEmpty().withMessage('id is required'),
    check('name').not().isEmpty().withMessage('Name is required'),
]
exports.deleteUserValidator = [
    check('id').not().isEmpty().withMessage('id is required')
]