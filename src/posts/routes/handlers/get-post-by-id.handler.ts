import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsService} from "../../application/posts.servise";
import {errorsHandler} from "../../../core/errors/errors.handler";

export const getPostByIdHandler = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        const viewPost = await postsService.findOne(req.params.id)
        res.status(HttpStatus.Ok).send(viewPost)

    } catch(e:unknown) {
        errorsHandler(e,res)
    }

}