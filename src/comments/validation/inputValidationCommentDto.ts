import {body} from "express-validator";

const contentValidation = body('content')
    .exists()
    .isString().withMessage('content must be a string')
    .isLength({min: 20, max: 300}).withMessage('content min 20 max 300')

export const inputValidationCommentDto = [contentValidation]