import {Request, Response} from "express";
import {BlogInputDto} from "../../dto/blogs.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";
import {createErrorMessages} from "../../../core/middlewares/validator/input-validation-result.middleware";

export const updateBlogHandler = async (req: Request<{id:string},{},BlogInputDto>, res: Response) => {
    try{
        const isBlogUpdated = await blogsRepository.updateBlog(req.params.id, req.body)
        if(isBlogUpdated){
            res.sendStatus(HttpStatus.NoContent)
            return;
        }
        res.status(HttpStatus.NotFound).send(createErrorMessages([{field: 'id', message: "Blog not found."}]));
    }catch{
        res.sendStatus(HttpStatus.InternalServerError)
    }


}