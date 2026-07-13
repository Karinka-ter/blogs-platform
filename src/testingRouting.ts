import {Request, Response, Router} from "express";
import {db} from "./db/in-memory.db";

export const testingRouter = Router({});

testingRouter.delete("/all-data",(req: Request, res: Response)=>{
    console.log("DELETE /testing/all-data")
    db.blogs = []
    db.posts = []
    res.sendStatus(204)
})