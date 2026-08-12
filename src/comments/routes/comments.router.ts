import {Router} from "express";
import {AUTH_ROUTES} from "../constants/comments.path";
import {createCommentHandler} from "./handlers/create-comment.handler";
import {tokenValidationMiddleware} from "../../core/middlewares/validator/tokenValidation";
import {updateCommentHandler} from "./handlers/update-comment.handler";

export const commentsRouter = Router({})

commentsRouter.post(AUTH_ROUTES.ROOT,tokenValidationMiddleware, createCommentHandler);
commentsRouter.put(AUTH_ROUTES.DY_ID,tokenValidationMiddleware, updateCommentHandler);