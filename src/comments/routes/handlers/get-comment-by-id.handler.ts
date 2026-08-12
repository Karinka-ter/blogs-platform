import {Request, Response} from "express";
import {commentsQueryRepository} from "../../repositories/comments-query.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {errorsHandler} from "../../../core/errors/errors.handler";

export const getCommentByIdHandler=async (req:Request<{commentId:string},{},{}>,res:Response)=>{
    try{
        const comment = await commentsQueryRepository.getCommentById(req.params.commentId)
        res.status(HttpStatus.Ok).send(comment)
    }catch(err:unknown){
        errorsHandler(err,res)
    }

}