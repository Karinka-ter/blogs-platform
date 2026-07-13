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
import {BLOGS_ROUTES} from "../constants/blogs.paths";

export const blogsRouter = Router({});

blogsRouter
    .get(BLOGS_ROUTES.ROOT, getBlogsHandler)
    .get(BLOGS_ROUTES.DY_ID,idValidation,inputValidationResultMiddleware, getBlogByIdHandler)
    .post(BLOGS_ROUTES.ROOT,superAdminGuardMiddleware,inputValidationDtoMiddleware,inputValidationResultMiddleware, createBlogHandler)
    .put(BLOGS_ROUTES.DY_ID,superAdminGuardMiddleware,idValidation,inputValidationDtoMiddleware,inputValidationResultMiddleware, updateBlogHandler)
    .delete(BLOGS_ROUTES.DY_ID,superAdminGuardMiddleware,idValidation,inputValidationResultMiddleware, deleteBlogHandler);