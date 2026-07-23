import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";
import {createErrorMessages} from "../../../core/middlewares/validator/input-validation-result.middleware";

export const deleteBlogHandler = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        const isBlogDeleted = await blogsRepository.deleteBlog(req.params.id);
        if (isBlogDeleted) {
            res.sendStatus(HttpStatus.NoContent)
            return
        }
        res.status(HttpStatus.NotFound).send(createErrorMessages([{field: 'id', message: "Blog not found."}]));
    } catch {
        res.sendStatus(HttpStatus.InternalServerError);
    }


}