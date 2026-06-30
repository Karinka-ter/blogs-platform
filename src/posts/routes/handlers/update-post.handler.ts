import {Request, Response} from "express";
import {PostsInputDto} from "../../dto/posts.input-dto";
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export const updatePostHandler = async (req: Request<{id:string},{},PostsInputDto>, res: Response) => {
    const postEdited = postsRepository.updatePost(req.params.id, req.body);
    if(postEdited) {
        res.sendStatus(HttpStatus.NoContent)
        return
    }
    res.status(HttpStatus.NotFound).send("Not Found");
}