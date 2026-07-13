import {Request, Response, Router} from "express";
import {db} from "./db/in-memory.db";

export const testingRouter = Router({});

testingRouter.delete("/all-data", (req: Request,res: Response) => {
    db.posts = []
    db.blogs = []
    res.sendStatus(204)
})