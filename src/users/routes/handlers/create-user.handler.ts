import {Request, Response} from "express";
import {usersService} from "../../application/users.service";
import {HttpStatus} from "../../../core/types/http-statuses";
import {errorsHandler} from "../../../core/errors/errors.handler";
import {usersQueryRepository} from "../../repositories/users-query.repository";

export const createUserHandler = async (req:Request,res:Response)=>{
    try{
        const user = await usersService.create(req.body)
        return res.status(HttpStatus.Created).send(user)
    } catch (e:unknown){
        errorsHandler(e,res)
    }

}