import {db} from "../../db/in-memory.db";
import {Blog} from "../types/blogs-type";
import {BlogInputDto} from "../dto/blogs.input-dto";

export const blogsRepository = {
    findAll(): Blog[] {
        return db.blogs
    },

    findById(id: string): Blog | null {
        const blog = db.blogs.find(blog => id === blog.id);
        if (blog) {
            return blog
        }
        return null
    },

    createBlog(dto: BlogInputDto): Blog {
        const blogId = Date.now().toString()
        const newBlog = {id: blogId,...dto}
        db.blogs.push(newBlog);
        return newBlog
    },

    updateBlog(id: string, dto: BlogInputDto): boolean {
        const indexBlog = db.blogs.findIndex(blog => blog.id === id)
        if (indexBlog !== -1) {
            db.blogs[indexBlog].name = dto.name;
            db.blogs[indexBlog].description = dto.description;
            db.blogs[indexBlog].websiteUrl = dto.websiteUrl;
            return true
        }
        return false;
    },

    deleteBlog(id: string): boolean {
        const indexBlog = db.blogs.findIndex(
            blog => blog.id === id
        );

        if (indexBlog === -1) {
            return false;
        }

        db.blogs.splice(indexBlog, 1);
        db.posts = db.posts.filter(
            post => post.blogId !== id
        );

        return true;
    }
}