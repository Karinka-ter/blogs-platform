import {body} from "express-validator";

const titleValidationMiddleware = body('title')
    .exists()
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({min: 1, max: 30})
    .withMessage('Length min 1 max 30')

const shortDescriptionValidatorMiddleware = body('shortDescription')
    .exists()
    .isString()
    .withMessage('ShortDescription must be a string')
    .trim()
    .isLength({min: 1, max: 100})
    .withMessage('Length min 1 max 100')


const contentValidationMiddleware = body('content')
    .exists()
    .isString()
    .withMessage('Content must be a string')
    .trim()
    .isLength({min: 1, max: 1000})
    .withMessage('Length min 1 max 1000')

const blogIdValidationMiddleware = body('blogId')
    .exists()
    .isString()
    .withMessage('Content must be a string')

export const inputValidationDtoPostsMiddleware = [
    titleValidationMiddleware,
    shortDescriptionValidatorMiddleware,
    contentValidationMiddleware,
    blogIdValidationMiddleware

]