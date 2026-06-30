import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export const getPostByIdHandler = async (req: Request<{id:string},{},{}>, res: Response) => {
    const blog = postsRepository.findById(req.params.id)
    if (blog) {
        res.status(HttpStatus.Ok).send(blog)
        return
    }
    res.status(HttpStatus.NotFound).send("Not Found");
}