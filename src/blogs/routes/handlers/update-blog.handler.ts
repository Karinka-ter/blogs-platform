import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsRepository} from "../../../posts/repositories/posts.repository";
import {BlogInputDto} from "../../types/blogs-type";
import {blogsService} from "../../application/blogs.servise";
import {errorsHandler} from "../../../core/errors/errors.handler";

export const updateBlogHandler = async (req: Request<{ id: string }, {}, BlogInputDto>, res: Response) => {
    try {
        await blogsService.update(req.params.id, req.body);
        await postsRepository.updatePostsBlogName(req.params.id, req.body.name)
        res.sendStatus(HttpStatus.NoContent)
    } catch (e: unknown) {
        errorsHandler(e, res)
    }
}