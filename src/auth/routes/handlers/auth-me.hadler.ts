import {Request, Response} from "express";
import {usersQueryRepository} from "../../../users/repositories/users-query.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export const authMeHandler = async (req: Request, res: Response) => {
    if(req.user){
        const user = await usersQueryRepository.findByIdOrFail(req.user.userId)
        res.status(HttpStatus.Ok).send(user)
    }
}