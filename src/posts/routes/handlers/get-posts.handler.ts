import {HttpStatus} from "../../../core/types/http-statuses";
import {Request,Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";

export const getPostsHandler = async (_req: Request, res: Response) => {
    res.status(HttpStatus.Ok).send(postsRepository.findAll());
}