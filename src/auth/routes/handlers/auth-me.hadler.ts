import {Request, Response} from "express";
import {authService} from "../../application/auth.service";
import {HttpStatus} from "../../../core/types/http-statuses";

export const authMeHandler = async (req: Request, res: Response) => {
    const {login, password} = req.body;
    const user = await authService.loginUser(login, password);
    if (!user) {
        res.sendStatus(HttpStatus.Unauthorized)
        return
    }
    res.status(HttpStatus.Ok).send(user)
}