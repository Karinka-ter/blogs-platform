import {Blog, BlogInputDto, BlogViewModel} from "../types/blogs-type";
import {blogsRepository} from "../repositories/blogs.repository";
import {blogsQueryRepository} from "../repositories/blogs-query-repository";
import {postsRepository} from "../../posts/repositories/posts.repository";

export const blogsService = {
    async create(dto: BlogInputDto): Promise<BlogViewModel> {
        const newBlog: Blog = {
            ...dto,
            createdAt: new Date(),
            isMembership: false
        }
        const id = await blogsRepository.createBlog(newBlog);
        return await blogsQueryRepository.findByIdOrFail(id)
    },
    async update(id: string,dto: BlogInputDto): Promise<void> {
       await blogsRepository.updateBlog(id, dto)
        await postsRepository.updatePostsBlogName(id, dto.name)
    },
    async delete(id: string): Promise<void> {
        await blogsRepository.deleteBlog(id);
    }
}