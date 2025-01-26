const { check } = require('express-validator');

exports.postAddValidator = [
    check('title').not().isEmpty().withMessage('title Require'),
    check('description').not().isEmpty().withMessage('description Require')
]