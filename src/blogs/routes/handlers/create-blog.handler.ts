import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {BlogInputDto} from "../../types/blogs-type";
import {blogsService} from "../../application/blogs.servise";
import {errorsHandler} from "../../../core/errors/errors.handler";

export const createBlogHandler = async (req: Request<{}, {}, BlogInputDto>, res: Response) => {
    try {
        const BlogViewModel = await blogsService.create(req.body);
        res.status(HttpStatus.Created).send(BlogViewModel);
    } catch(e:unknown) {
        errorsHandler(e, res);
    }
}


