const { check } = require('express-validator');

exports.categoryAddValidator = [
    check('category_name').not().isEmpty().withMessage('category_name is required')
]
exports.categoryDeleteValidator = [
    check('id').not().isEmpty().withMessage('id is required')
]

exports.categoryUpdateValidator = [
    check('id').not().isEmpty().withMessage('id is required'),
    check('category_name').not().isEmpty().withMessage('category_name is required'),
]