import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsQueryRepository} from "../../repositories/blogs-query-repository";
import {errorsHandler} from "../../../core/errors/errors.handler";


export const getBlogByIdHandler = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        const blogViewModel = await blogsQueryRepository.findByIdOrFail(req.params.id);
        res.status(HttpStatus.Ok).send(blogViewModel)
    } catch (e: unknown) {
        errorsHandler(e, res)
    }
}
