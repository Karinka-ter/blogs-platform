import {PaginationAndSorting} from "../../core/types/pagination-and-sorting";
import {postsRepository} from "../repositories/posts.repository";
import {InputPostType, Post, PostView} from "../types/posts-type";
import {mapPostToViewModel} from "../routes/mappers/map-post-to-view-model";
import {blogsRepository} from "../../blogs/repositories/blogs.repository";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found.errors";


export const postsService = {
    async findMany(query: PaginationAndSorting<string>, blogId?: string  ): Promise<{ items: PostView[]; totalCount: number }> {
      if(blogId){
          const blog = await blogsRepository.findById(blogId);
          if (!blog) {
              throw new RepositoryNotFoundError('No blog found');
          }
      }
        const {items, totalCount} = await postsRepository.findAll(query, blogId);
        const postsViewModel = items.map(mapPostToViewModel)
        return {items: postsViewModel, totalCount};
    },
    async findOne(id: string): Promise<PostView> {
        const post = await postsRepository.findById(id)
        if (!post) {
            throw new RepositoryNotFoundError('Post not found');
        }
        return  mapPostToViewModel(post)
    },
    async create(dto: InputPostType, blogId?: string): Promise<PostView> {
        const actualBlogId = blogId ?? dto.blogId;
        const blog = await blogsRepository.findById(actualBlogId)
        if (!blog) {
            throw new RepositoryNotFoundError('blogId not found');
        }
        const newPost: Post = {
            title: dto.title,
            shortDescription: dto.shortDescription,
            content: dto.content,
            blogId: actualBlogId,
            blogName: blog.name,
            createdAt: new Date(),
        };

        const post = await postsRepository.createPost(newPost);

        if (!post) {
            throw new RepositoryNotFoundError('post not found');
        }

        return mapPostToViewModel(post)

    },
    async update(dto: InputPostType,id:string): Promise<void> {
        const postEdited = await postsRepository.updatePost(id,dto);
        if (!postEdited) {
            throw new RepositoryNotFoundError('post not updated');
        }
    },
    async delete(id: string): Promise<void> {
        const postDeleted = await postsRepository.deletePost(id);
        if (!postDeleted) {
            throw new RepositoryNotFoundError('post not deleted');
        }
    }
}