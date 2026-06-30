import {Request, Response} from "express";
import {BlogInputDto} from "../../dto/blogs.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";

export const createBlogHandler = (req: Request<{}, {}, BlogInputDto>, res: Response) => {
   const newBlog = blogsRepository.createBlog(req.body);
    res.status(HttpStatus.Created).send(newBlog);
}