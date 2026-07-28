import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/middlewares/validator/input-validation-result.middleware";
import {blogsService} from "../../application/blogs.servise";
import {errorsHandler} from "../../../core/errors/errors.handler";

export const getBlogByIdHandler = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        const blogViewModel = await blogsService.findOne(req.params.id);
        res.status(HttpStatus.Ok).send(blogViewModel)
    } catch (e: unknown) {
        errorsHandler(e, res)
    }
}
