import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {errorsHandler} from "../../../core/errors/errors.handler";
import {postsQueryRepository} from "../../repositories/posts-query-repository";

export const getPostByIdHandler = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        const viewPost = await postsQueryRepository.findByIdOrFail(req.params.id);
        res.status(HttpStatus.Ok).send(viewPost)

    } catch(e:unknown) {
        errorsHandler(e,res)
    }

}