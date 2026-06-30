import {Request,Response} from "express";
import {PostsInputDto} from "../../dto/posts.input-dto";
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export const createPostHandler = async (req: Request<{},{},PostsInputDto>, res: Response) => {
    const post = postsRepository.createPost(req.body);
    if(post){
        res.status(HttpStatus.Created).send(post);
        return;
    }
    res.status(HttpStatus.BadRequest).send("Not Found");
}