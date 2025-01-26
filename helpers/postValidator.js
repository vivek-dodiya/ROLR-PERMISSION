const { check } = require('express-validator');

exports.postAddValidator = [
    check('title').not().isEmpty().withMessage('title Require'),
    check('description').not().isEmpty().withMessage('description Require')
]
exports.postUpdateValidator = [
    check('id').not().isEmpty().withMessage('id is required'),
    check('title').not().isEmpty().withMessage('title is required'),
    check('description').not().isEmpty().withMessage('description is required')
]
exports.postDeleteValidator = [
    check('id').not().isEmpty().withMessage('id is required')
]