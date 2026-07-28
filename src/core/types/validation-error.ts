import {HttpStatus} from "./http-statuses";

export type ValidationErrorType = {
    status?: HttpStatus;
    message: string;
    source?: string;
    field: string;
    code?: string;
};


export type ValidationErrorDto = { errorsMessages: ValidationErrorType[] };