import {createErrorMessages} from "../middlewares/validator/input-validation-result.middleware";
import {HttpStatus} from "../types/http-statuses";
import {RepositoryNotFoundError} from "./repository-not-found.errors";
import {DomainError} from "./domain.errors";
import {Response} from "express";

export function errorsHandler(error: unknown, res: Response): void {
    if (error instanceof RepositoryNotFoundError) {
        const httpStatus = HttpStatus.NotFound;

        res.status(httpStatus).send(
            createErrorMessages([
                {
                    field: error.name,
                    status: httpStatus,
                    message: error.message,
                },
            ]),
        );

        return;
    }

    if (error instanceof DomainError) {
        const httpStatus = HttpStatus.UnprocessableEntity;

        res.status(httpStatus).send(
            createErrorMessages([
                {
                    field: error.name,
                    status: httpStatus,
                    source: error.source,
                    message: error.message,
                    code: error.code,
                },
            ]),
        );

        return;
    }

    res.sendStatus(HttpStatus.InternalServerError);
    return;
}