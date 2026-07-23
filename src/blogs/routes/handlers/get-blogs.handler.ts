import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";
import {mapToBlogsViewModel} from "../mappers/map-to-blogs-view-model";

export const getBlogsHandler = async (_req: Request, res: Response) => {
    try {
        const blogs = await blogsRepository.findAll();
        const blogsViewModel = blogs.map(mapToBlogsViewModel);
        res.status(HttpStatus.Ok).send(blogsViewModel)
    } catch (err) {
        res.sendStatus(HttpStatus.InternalServerError);
    }

    res.status(HttpStatus.Ok).send(blogsRepository.findAll());
}

