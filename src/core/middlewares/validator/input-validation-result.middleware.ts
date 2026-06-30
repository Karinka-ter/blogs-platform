import {ValidationError, validationResult} from "express-validator";
import { Request, Response, NextFunction } from 'express';
import {HttpStatus} from "../../types/http-statuses";

const formatErrors = (error: ValidationError) => ({
    field: error.type,
    message: error.msg
})



export const inputValidationResultMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req).formatWith(formatErrors).array();

    if (errors.length) {
        return res.status(HttpStatus.BadRequest).json({ errorsMessages: errors });
    }

    next(); // Если ошибок нет, передаём управление дальше
};