import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";

export const getBlogsHandler = (_req: Request, res: Response) => {
    res.status(HttpStatus.Ok).send(blogsRepository.findAll());
}