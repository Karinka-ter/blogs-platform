import {Request, Response} from "express";
import {BlogInputDto} from "../../dto/blogs.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";
import {createErrorMessages} from "../../../core/middlewares/validator/input-validation-result.middleware";

export const updateBlogHandler = (req: Request<{id:string},{},BlogInputDto>, res: Response) => {
    const BlogUpdated = blogsRepository.updateBlog(req.params.id, req.body)
    if(BlogUpdated){
        res.sendStatus(HttpStatus.NoContent)
        return;
    }
    res.status(HttpStatus.NotFound).send(createErrorMessages([{field: 'id', message: "Blog not found."}]));
}