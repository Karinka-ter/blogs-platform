import {Request, Response} from "express";
import {BlogInputDto} from "../../dto/blogs.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";
import {Blog} from "../../types/blogs-type";
import {mapToBlogsViewModel} from "../mappers/map-to-blogs-view-model";

export const createBlogHandler = async (req: Request<{}, {}, BlogInputDto>, res: Response) => {
    try {
        const newBlog: Blog = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
        }
        const createdBlog = await blogsRepository.createBlog(newBlog);
        const BlogViewModel = mapToBlogsViewModel(createdBlog);
        res.status(HttpStatus.Created).send(BlogViewModel);

    } catch {
        res.sendStatus(HttpStatus.InternalServerError);
    }
}


