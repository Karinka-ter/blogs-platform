import {Request, Response} from "express";
import {BlogInputDto} from "../../dto/blogs.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";
import {Blog} from "../../types/blogs-type";

export const createBlogHandler = (req: Request<{}, {}, BlogInputDto>, res: Response) => {
    const dto =  {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
    }
   const newBlog = blogsRepository.createBlog(dto);
    res.status(HttpStatus.Created).send(newBlog);
}