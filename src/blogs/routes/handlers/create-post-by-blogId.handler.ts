import {Request, Response} from "express";
import {InputPostType} from "../../../posts/types/posts-type";
import {postsService} from "../../../posts/application/posts.servise";
import {HttpStatus} from "../../../core/types/http-statuses";
import {errorsHandler} from "../../../core/errors/errors.handler";

export const createPostByBlogIdHandler = async (req: Request<{id:string}, {}, InputPostType>, res: Response) => {
    try {
        const post = await postsService.create(req.body,req.params.id);
        res.status(HttpStatus.Created).send(post);

    } catch(e:unknown) {
        errorsHandler(e,res)
    }
}