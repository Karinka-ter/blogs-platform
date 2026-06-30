import {body} from "express-validator";


const  WEBSITE_URL_REGEX =/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/

const nameValidationMiddleware = body('name')
    .exists()
    .withMessage('Name is required')
    .isString()
    .withMessage('name must be a string')
    .trim()
    .isLength({min: 1, max: 15})
    .withMessage('name length min 1 max 15')

const descriptionValidationMiddleware = body('description')
    .exists()
    .withMessage('description must be a string')
    .isString()
    .withMessage('description must be a string')
    .trim()
    .isLength({min: 2, max: 500})
    .withMessage('description length min 1 max 15')

const websiteUrlValidationMiddleware = body('websiteUrl')
    .exists()
    .withMessage('websiteUrl must be a string')
    .isString()
    .withMessage('website URL must be a string')
    .trim()
    .isLength({min: 5, max: 100})
    .withMessage('website length min 5 max 100')
    .matches(WEBSITE_URL_REGEX)
    .withMessage('websiteUrl is invalid')


export const inputValidationDtoMiddleware = [
    nameValidationMiddleware,
    descriptionValidationMiddleware,
    websiteUrlValidationMiddleware
]

