import {NextFunction, Request, Response} from "express";
import {HttpStatus} from "../../types/http-statuses";
import {jwtService} from "../../../users/application/jwt-service";

export const tokenValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.sendStatus(HttpStatus.Unauthorized);
        return
    }

    const token = authHeader.split(' ')[1];
    const userId = await jwtService.getUserById(token);
    if (!userId) {
        res.sendStatus(HttpStatus.Unauthorized);
        return
    }

    req.user = {userId}
    next();

}