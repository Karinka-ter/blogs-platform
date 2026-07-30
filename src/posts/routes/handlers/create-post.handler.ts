import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {PostInputDto} from "../../types/posts-type";
import {postsService} from "../../application/posts.servise";
import {errorsHandler} from "../../../core/errors/errors.handler";

export const createPostHandler = async (req: Request<{}, {}, PostInputDto>, res: Response) => {
    try {
        const post = await postsService.create(req.body);
        res.status(HttpStatus.Created).send(post);

    } catch(e:unknown) {
        errorsHandler(e,res)
    }
}