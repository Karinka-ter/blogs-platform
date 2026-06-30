import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";

export const deleteBlogHandler = (req: Request<{id:string},{},{}>, res: Response) => {
    const blogDeleted = blogsRepository.deleteBlog(req.params.id);
    if(blogDeleted){
        res.sendStatus(HttpStatus.NoContent)
        return
    }
    res.sendStatus(HttpStatus.NotFound)
}