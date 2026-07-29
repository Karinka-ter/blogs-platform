import {Request,Response} from "express";
import {errorsHandler} from "../../../core/errors/errors.handler";
import {usersService} from "../../application/users.service";
import {HttpStatus} from "../../../core/types/http-statuses";

export const deleteUserHandler = async (req:Request<{id:string},{},{}>,res:Response)=>{
    try{
        await usersService.delete(req.params.id)
        res.sendStatus(HttpStatus.NoContent)
    }catch(e:unknown){
        errorsHandler(e,res)
    }
}