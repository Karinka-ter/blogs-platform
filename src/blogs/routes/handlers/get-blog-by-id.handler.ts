import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";
import {createErrorMessages} from "../../../core/middlewares/validator/input-validation-result.middleware";

export const getBlogByIdHandler = (req: Request<{ id: string }, {}, {}>, res: Response) => {
    const blog = blogsRepository.findById(req.params.id)
    if (blog) {
        res.status(HttpStatus.Ok).send(blog)
        return;
    }
    res.status(HttpStatus.NotFound).send(createErrorMessages([{field: 'id', message: "Blog not found."}]));
}