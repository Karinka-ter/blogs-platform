import {body} from "express-validator";

const userLoginPattern = /^[a-zA-Z0-9_-]*$/
const userEmailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

const userLogin = body('login')
    .exists()
    .isString().withMessage('login not string')
    .trim()
    .isLength({min: 3, max: 10}).withMessage('login length min 3 max 10')
    .matches(userLoginPattern).withMessage('login not matched')

const userPassword = body('password')
    .exists()
    .isString().withMessage('password not string')
    .trim()
    .isLength({min: 6, max: 20}).withMessage('password length min 6 max 20')


const userEmail = body('email')
    .exists()
    .isString().withMessage('email not string')
    .trim()
    .matches(userEmailPattern).withMessage('email does not match')


export const inputValidatorUserDtoMiddleware = [
    userLogin,userPassword,userEmail
]



