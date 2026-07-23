import {HttpStatus} from "../../../core/types/http-statuses";
import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {mapPostToViewModel} from "../mappers/map-post-to-view-model";

export const getPostsHandler = async (_req: Request, res: Response) => {
    try {
        const posts = await postsRepository.findAll()
        const viewPosts = posts.map(mapPostToViewModel)
        res.status(HttpStatus.Ok).send(viewPosts);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }

}