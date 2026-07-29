import {postsRepository} from "../repositories/posts.repository";
import {InputPostType, Post, PostView} from "../types/posts-type";
import {blogsQueryRepository} from "../../blogs/repositories/blogs-query-repository";
import {postsQueryRepository} from "../repositories/posts-query-repository";
import {DomainError} from "../../core/errors/domain.errors";
import {HttpStatus} from "../../core/types/http-statuses";


export const postsService = {
    async create(dto: InputPostType, blogId?: string): Promise<PostView> {
        const actualBlogId = blogId ?? dto.blogId;
        const blog = await blogsQueryRepository.findByIdOrFail(actualBlogId);

        const newPost: Post = {
            title: dto.title,
            shortDescription: dto.shortDescription,
            content: dto.content,
            blogId: actualBlogId,
            blogName: blog.name,
            createdAt: new Date(),
        };

        const postId = await postsRepository.createPost(newPost);
        return await postsQueryRepository.findByIdOrFail(postId);

    },
    async update(dto: InputPostType,id:string): Promise<void> {
         await postsRepository.updatePost(id,dto);

    },
    async delete(id: string): Promise<void> {
       await postsRepository.deletePost(id);

    }
}