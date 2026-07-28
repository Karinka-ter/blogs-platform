import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {errorsHandler} from "../../../core/errors/errors.handler";
import {blogsService} from "../../application/blogs.servise";

export const deleteBlogHandler = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        await blogsService.delete(req.params.id)
        res.sendStatus(HttpStatus.NoContent)
    } catch(e: unknown) {
        errorsHandler(e, res)
    }


}