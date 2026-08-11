import {body} from "express-validator";

const loginInEmailValidationMiddleware = body('loginOrEmail')
    .exists()
    .isString().withMessage('loginOrEmail must be a string')
    .trim()
const passwordValidationMiddleware = body('password')
    .exists()
    .isString().withMessage('password must be a string')
    .trim()

export const inputValidatorMiddleware = [loginInEmailValidationMiddleware, passwordValidationMiddleware];