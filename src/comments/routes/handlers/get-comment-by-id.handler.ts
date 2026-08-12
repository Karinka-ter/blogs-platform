import {Request, Response} from "express";
import {commentsQueryRepository} from "../../repositories/comments-query.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export const getCommentByIdHandler=(req:Request<{commentId:string},{},{}>,res:Response)=>{
    const comment = commentsQueryRepository.getCommentById(req.params.commentId)
    res.status(HttpStatus.Ok).send(comment)
}