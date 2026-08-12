import {Request, Response} from "express";
import {commentsService} from "../../application/comments.service";
import {HttpStatus} from "../../../core/types/http-statuses";
import {errorsHandler} from "../../../core/errors/errors.handler";

export const deleteCommentHandler = async (req:Request<{commentId:string},{},{}>,res:Response)=>{
    try{
        await commentsService.delete(req.params.commentId,req.user!.userId)
        res.sendStatus(HttpStatus.NoContent)
    }catch(e:unknown){
        errorsHandler(e, res);
    }

}