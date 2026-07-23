import {Router} from "express";
import {getPostsHandler} from "./handlers/get-posts.handler";
import {getPostByIdHandler} from "./handlers/get-post-by-id.handler";
import {createPostHandler} from "./handlers/create-post.handler";
import {updatePostHandler} from "./handlers/update-post.handler";
import {deletePostHandler} from "./handlers/delete-post.handler";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";
import {idValidation} from "../../core/middlewares/validator/params-id.validation-middleware";
import {inputValidationResultMiddleware} from "../../core/middlewares/validator/input-validation-result.middleware";
import {inputValidationDtoPostsMiddleware} from "../validation/inputValidationDtoPostsMiddleware";
import {POSTS_ROUTE} from "../constants/posts.paths";

export const postsRouter = Router({});

postsRouter
    .get(POSTS_ROUTE.ROOT, getPostsHandler)
    .get(POSTS_ROUTE.DY_ID, idValidation, inputValidationResultMiddleware, getPostByIdHandler)
    .post(POSTS_ROUTE.ROOT, superAdminGuardMiddleware, inputValidationDtoPostsMiddleware, inputValidationResultMiddleware, createPostHandler)
    .put(POSTS_ROUTE.DY_ID, superAdminGuardMiddleware, idValidation, inputValidationDtoPostsMiddleware, inputValidationResultMiddleware, updatePostHandler)
    .delete(POSTS_ROUTE.DY_ID, superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, deletePostHandler)


