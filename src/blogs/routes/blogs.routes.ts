import {Router} from 'express'
import {getBlogsHandler} from "./handlers/get-blogs.handler";
import {getBlogByIdHandler} from "./handlers/get-blog-by-id.handler";
import {updateBlogHandler} from "./handlers/update-blog.handler";
import {createBlogHandler} from "./handlers/create-blog.handler";
import {deleteBlogHandler} from "./handlers/delete-blog.handler";
import {idValidation} from "../../core/middlewares/validator/params-id.validation-middleware";
import {inputValidationResultMiddleware} from "../../core/middlewares/validator/input-validation-result.middleware";
import {inputValidationBlogDtoMiddleware} from "../validation/inputValidationBlogDtoMiddleware";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";
import {BLOGS_ROUTES} from "../constants/blogs.paths";
import {
    paginationAndSortingValidation
} from "../../core/middlewares/validator/query-pagination-sorting.validation.middleware";
import {BlogsSortField} from "../input/BlogsSortField";
import {getBlogsIdPostsHandler} from "./handlers/get-blogs-id-posts.handler";
import {PostsSortField} from "../../posts/input/PostsSortField";
import {createPostByBlogIdHandler} from "./handlers/create-post-by-blogId.handler";
import {inputValidationDtoPostsMiddleware} from "../../posts/validation/inputValidationDtoPostsMiddleware";

export const blogsRouter = Router({});

blogsRouter
    .get(BLOGS_ROUTES.ROOT,paginationAndSortingValidation(BlogsSortField), getBlogsHandler)
    .get(BLOGS_ROUTES.DY_ID,idValidation,inputValidationResultMiddleware, getBlogByIdHandler)
    .post(BLOGS_ROUTES.ROOT,superAdminGuardMiddleware,inputValidationBlogDtoMiddleware,inputValidationResultMiddleware, createBlogHandler)
    .post(`${BLOGS_ROUTES.DY_ID}/posts`,superAdminGuardMiddleware,inputValidationDtoPostsMiddleware,inputValidationResultMiddleware,createPostByBlogIdHandler)
    .put(BLOGS_ROUTES.DY_ID,superAdminGuardMiddleware,idValidation,inputValidationBlogDtoMiddleware,inputValidationResultMiddleware, updateBlogHandler)
    .delete(BLOGS_ROUTES.DY_ID,superAdminGuardMiddleware,idValidation,inputValidationResultMiddleware, deleteBlogHandler)
    .get('/:id/posts', idValidation, paginationAndSortingValidation(PostsSortField), inputValidationResultMiddleware,getBlogsIdPostsHandler,);