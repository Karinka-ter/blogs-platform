import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {mapPostToViewModel} from "../mappers/map-post-to-view-model";

export const getPostByIdHandler = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        const post = await postsRepository.findById(req.params.id)
        if (post) {
            const viewPost = mapPostToViewModel(post)
            res.status(HttpStatus.Ok).send(viewPost)
            return
        }
        res.status(HttpStatus.NotFound).send("Not Found");
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }

}