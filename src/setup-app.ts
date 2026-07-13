import express, {Express, Request, Response} from "express";
import {blogsRouter} from "./blogs/routes/blogs.routes";
import {setupSwagger} from "./core/swagger/setup-swagger";
import { POST_PATH, TESTING_PATH} from "./core/paths/paths";
import {postsRouter} from "./posts/routes/posts.routes";
import {testingRouter} from "./testingRouting";
import {HttpStatus} from "./core/types/http-statuses";
import {BLOGS_PATH} from "./blogs/constants/blogs.paths";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    app.get('/', (_req: Request, res: Response) => {
        res.status(HttpStatus.Ok).send('Hello :)')
    })

    app.use(BLOGS_PATH, blogsRouter);
    app.use(POST_PATH,postsRouter)
    app.use(TESTING_PATH, testingRouter)

    setupSwagger(app);
    return app;
};