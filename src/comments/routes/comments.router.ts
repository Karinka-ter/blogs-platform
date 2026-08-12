import {Router} from "express";
import { COMMENTS_ROUTES} from "../constants/comments.path";
import {createCommentHandler} from "./handlers/create-comment.handler";
import {tokenValidationMiddleware} from "../../core/middlewares/validator/tokenValidation";
import {updateCommentHandler} from "./handlers/update-comment.handler";
import {inputValidationCommentDto} from "../validation/inputValidationCommentDto";
import {inputValidationResultMiddleware} from "../../core/middlewares/validator/input-validation-result.middleware";

export const commentsRouter = Router({})

commentsRouter.post(COMMENTS_ROUTES.ROOT,tokenValidationMiddleware, createCommentHandler);
commentsRouter.put(COMMENTS_ROUTES.BY_ID,tokenValidationMiddleware,inputValidationCommentDto,inputValidationResultMiddleware, updateCommentHandler);