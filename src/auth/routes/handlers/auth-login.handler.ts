import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {authService} from "../../application/auth.service";

export const authLoginHandler = async (req: Request, res: Response) => {
    const {loginOrEmail, password} = req.body;
    const accessToken = await authService.loginUser(loginOrEmail, password);
    if (!accessToken) return res.sendStatus(HttpStatus.Unauthorized);

    return res.status(HttpStatus.Ok).send(accessToken);
}