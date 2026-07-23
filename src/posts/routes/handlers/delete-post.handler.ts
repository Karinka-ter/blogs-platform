import {Request,Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export const deletePostHandler = async (req: Request<{id:string},{},{}>, res: Response) => {
   try{
       const postDeleted = await postsRepository.deletePost(req.params.id);
       if (postDeleted) {
           res.sendStatus(HttpStatus.NoContent);
           return
       }
       res.sendStatus(HttpStatus.NotFound);
   }catch{
       res.sendStatus(HttpStatus.InternalServerError)
   }

}