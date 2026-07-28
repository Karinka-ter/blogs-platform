import {Request,Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {errorsHandler} from "../../../core/errors/errors.handler";
import {postsService} from "../../application/posts.servise";

export const deletePostHandler = async (req: Request<{id:string},{},{}>, res: Response) => {
   try{
       await postsService.delete(req.params.id);
       res.sendStatus(HttpStatus.NoContent);
   }catch(e:unknown) {
      errorsHandler(e,res)
   }

}