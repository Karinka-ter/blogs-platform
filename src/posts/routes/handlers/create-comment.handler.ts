import {Request, Response} from "express";
import {commentsService} from "../../../comments/application/comments.service";
import {commentsQueryRepository} from "../../../comments/repositories/comments-query.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {errorsHandler} from "../../../core/errors/errors.handler";

export const createCommentHandler = async (req:Request<{id:string},{},{content:string}>, res:Response) => {
   try{
      const commentId = await commentsService.create(req.user!.userId,req.params.id, req.body.content)
      const comment = await commentsQueryRepository.getCommentById(commentId)
      res.status(HttpStatus.Created).send(comment)
   }catch(e:unknown) {
      errorsHandler(e, res);
   }
}