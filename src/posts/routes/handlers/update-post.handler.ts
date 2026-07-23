import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {Post} from "../../types/posts-type";

export const updatePostHandler = async (req: Request<{ id: string }, {}, Post>, res: Response) => {
    try {
        const postEdited = await postsRepository.updatePost(req.params.id, req.body);
        if (postEdited) {
            res.sendStatus(HttpStatus.NoContent)
            return
        }
        res.status(HttpStatus.NotFound).send("Not Found");
    } catch {
        res.sendStatus(HttpStatus.InternalServerError);
    }


}