import express, {Express, Request, Response} from "express";
import {blogsRouter} from "./blogs/routes/blogs.routes";
import {setupSwagger} from "./core/swagger/setup-swagger";
import {postsRouter} from "./posts/routes/posts.routes";
import {HttpStatus} from "./core/types/http-statuses";
import {BLOGS_PATH} from "./blogs/constants/blogs.paths";
import {testingRouter} from "./testing/routes/testing.router";
import {TESTING_PATH} from "./testing/constants/testing.paths";
import {POSTS_PATH} from "./posts/constants/posts.paths";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    app.get('/', (_req: Request, res: Response) => {
        res.status(HttpStatus.Ok).send('Hello :)')
    })

    app.use(BLOGS_PATH, blogsRouter);
    app.use(POSTS_PATH,postsRouter)
    app.use(TESTING_PATH, testingRouter)

    setupSwagger(app);
    return app;
};