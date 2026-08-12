import {Request, Response} from "express";
import {commentsService} from "../../application/comments.service";
import {commentsQueryRepository} from "../../repositories/comments-query.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export const createCommentHandler = async (req:Request, res:Response) => {
   try{
      const commentId = await commentsService.create(req.user!.userId, req.body.content)
      const comment = await commentsQueryRepository.getCommentById(commentId)
      res.status(HttpStatus.Created).send(comment)
   }catch(err){
      console.log(err)
   }


}