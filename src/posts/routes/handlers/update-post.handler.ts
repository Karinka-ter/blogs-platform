import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {Post} from "../../types/posts-type";
import {postsService} from "../../application/posts.servise";
import {errorsHandler} from "../../../core/errors/errors.handler";

export const updatePostHandler = async (req: Request<{ id: string }, {}, Post>, res: Response) => {
    try {
        await postsService.update( req.body,req.params.id);
        res.sendStatus(HttpStatus.NoContent)

    } catch(e:unknown) {
       errorsHandler(e,res)
    }


}