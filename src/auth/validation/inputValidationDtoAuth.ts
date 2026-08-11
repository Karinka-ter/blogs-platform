import {body} from "express-validator";

const loginInEmailValidationMiddleware = body('loginOrEmail')
    .exists()
    .isString().withMessage('loginOrEmail must be a string')
    .trim()
    .isLength({min: 1})
    .withMessage('Length min 1')

const passwordValidationMiddleware = body('password')
    .exists()
    .isString().withMessage('password must be a string')
    .trim()
    .isLength({min: 1})
    .withMessage('Length min 1')

export const inputValidatorDtoAuthMiddleware = [loginInEmailValidationMiddleware, passwordValidationMiddleware];