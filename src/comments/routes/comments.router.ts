import {Router} from "express";
import { COMMENTS_ROUTES} from "../constants/comments.path";
import {createCommentHandler} from "../../posts/routes/handlers/create-comment.handler";
import {tokenValidationMiddleware} from "../../core/middlewares/validator/tokenValidation";
import {updateCommentHandler} from "./handlers/update-comment.handler";
import {inputValidationCommentDto} from "../validation/inputValidationCommentDto";
import {inputValidationResultMiddleware} from "../../core/middlewares/validator/input-validation-result.middleware";
import {deleteCommentHandler} from "./handlers/delete-comment.handler";
import {getCommentByIdHandler} from "./handlers/get-comment-by-id.handler";

export const commentsRouter = Router({})

commentsRouter.get(COMMENTS_ROUTES.BY_ID,getCommentByIdHandler)
commentsRouter.put(COMMENTS_ROUTES.BY_ID,tokenValidationMiddleware,inputValidationCommentDto,inputValidationResultMiddleware, updateCommentHandler);
commentsRouter.delete(COMMENTS_ROUTES.BY_ID,tokenValidationMiddleware,deleteCommentHandler)