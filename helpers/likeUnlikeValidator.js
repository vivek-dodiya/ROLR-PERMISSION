const {check} = require('express-validator');


exports.postLikeUnlikeValidator = [
    check('user_id').not().isEmpty().withMessage('user_id must is Required'),
    check('post_id').not().isEmpty().withMessage('post_id must is Required')
]
exports.postLikeCountValidator = [
    check('post_id').not().isEmpty().withMessage('post_id must is Required')
]