import {Request, Response} from "express";
import {PostsInputDto} from "../../dto/posts.input-dto";
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {InputPostType, Post} from "../../types/posts-type";
import {mapPostToViewModel} from "../mappers/map-post-to-view-model";
import {blogsCollection} from "../../../db/collections";
import {ObjectId} from "mongodb";
import {postsService} from "../../application/posts.servise";
import {errorsHandler} from "../../../core/errors/errors.handler";

export const createPostHandler = async (req: Request<{}, {}, InputPostType>, res: Response) => {
    try {
        const post = await postsService.create(req.body);
        res.status(HttpStatus.Created).send(post);

    } catch(e:unknown) {
        errorsHandler(e,res)
    }
}