import {Blog, BlogInputDto, BlogViewModel} from "../types/blogs-type";
import {blogsRepository} from "../repositories/blogs.repository";
import {mapToBlogsViewModel} from "../routes/mappers/map-to-blogs-view-model";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found.errors";
import {PaginationAndSorting} from "../../core/types/pagination-and-sorting";

export const blogsService = {
    async findMany(query: PaginationAndSorting<string>): Promise<{ items: BlogViewModel[]; totalCount: number }> {
        const { items, totalCount }  = await blogsRepository.findAll(query);
        const blogsMapViewModel = items.map(mapToBlogsViewModel);
        return {items:blogsMapViewModel,totalCount}
    },
    async findOne(id: string): Promise<BlogViewModel> {
        const blog = await blogsRepository.findById(id)
        if (!blog) {
            throw new RepositoryNotFoundError("Blog not found");
        }
        return mapToBlogsViewModel(blog)
    },
    async create(dto: BlogInputDto): Promise<BlogViewModel> {
        const newBlog: Blog = {
            ...dto,
            createdAt: new Date(),
            isMembership: false
        }
        const blog = await blogsRepository.createBlog(newBlog);
        return mapToBlogsViewModel(blog);
    },
    async update(id: string,dto: BlogInputDto): Promise<void> {
      const updatedBlog = await blogsRepository.updateBlog(id, dto)
        if (!updatedBlog) {
            throw new RepositoryNotFoundError("Blog not updated");
        }
    },
    async delete(id: string): Promise<void> {
        const deleted = await blogsRepository.deleteBlog(id);
        if (!deleted) {
            throw new RepositoryNotFoundError("Blog not deleted");
        }
    }
}