import {Router} from 'express'
import {getBlogsHandler} from "./handlers/get-blogs.handler";
import {getBlogByIdHandler} from "./handlers/get-blog-by-id.handler";
import {updateBlogHandler} from "./handlers/update-blog.handler";
import {createBlogHandler} from "./handlers/create-blog.handler";
import {deleteBlogHandler} from "./handlers/delete-blog.handler";
import {idValidation} from "../../core/middlewares/validator/params-id.validation-middleware";
import {inputValidationResultMiddleware} from "../../core/middlewares/validator/input-validation-result.middleware";
import {inputValidationDtoMiddleware} from "../validation/inputValidationDtoMiddleware";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";

export const blogsRouter = Router({});

blogsRouter
    .get('', getBlogsHandler)
    .get('/:id',idValidation,inputValidationResultMiddleware, getBlogByIdHandler)
    .post('',superAdminGuardMiddleware,inputValidationDtoMiddleware,inputValidationResultMiddleware, createBlogHandler)
    .put('/:id',superAdminGuardMiddleware,idValidation,inputValidationDtoMiddleware,inputValidationResultMiddleware, updateBlogHandler)
    .delete('/:id',superAdminGuardMiddleware,idValidation,inputValidationResultMiddleware, deleteBlogHandler);