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
import {
    paginationAndSortingValidation
} from "../../core/middlewares/validator/query-pagination-sorting.validation.middleware";
import {PostsSortField} from "./input/posts-sort-field";
import {getCommentsByPostIdHandler} from "./handlers/get-comments-by-post-id.handler";
import {tokenValidationMiddleware} from "../../core/middlewares/validator/tokenValidation";
import {inputValidationCommentDto} from "../../comments/validation/inputValidationCommentDto";
import {createCommentHandler} from "./handlers/create-comment.handler";
import {CommentsSortField} from "./input/comments-sort-field";

export const postsRouter = Router({});

postsRouter
    .get(POSTS_ROUTE.ROOT,paginationAndSortingValidation(PostsSortField), getPostsHandler)
    .get(POSTS_ROUTE.DY_ID, idValidation, inputValidationResultMiddleware, getPostByIdHandler)
    .post(POSTS_ROUTE.ROOT, superAdminGuardMiddleware, inputValidationDtoPostsMiddleware, inputValidationResultMiddleware, createPostHandler)
    .put(POSTS_ROUTE.DY_ID, superAdminGuardMiddleware, idValidation, inputValidationDtoPostsMiddleware, inputValidationResultMiddleware, updatePostHandler)
    .delete(POSTS_ROUTE.DY_ID, superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, deletePostHandler)
    .get(`${POSTS_ROUTE.DY_ID}/comments`,paginationAndSortingValidation(CommentsSortField), getCommentsByPostIdHandler)
    .post(`${POSTS_ROUTE.DY_ID}/comments`,tokenValidationMiddleware,inputValidationCommentDto,inputValidationResultMiddleware,createCommentHandler)


