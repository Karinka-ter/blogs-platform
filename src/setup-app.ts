import express, {Express} from "express";
import {blogsRouter} from "./blogs/routes/blogs.routes";
import {setupSwagger} from "./core/swagger/setup-swagger";
import {BLOGS_PATH, POST_PATH} from "./core/paths/paths";
import {postsRouter} from "./posts/routes/posts.routes";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    app.use(BLOGS_PATH, blogsRouter);
    app.use(POST_PATH,postsRouter)

    setupSwagger(app);
    return app;
};