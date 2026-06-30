import {db} from "../../db/in-memory.db";
import {Post} from "../types/posts-type";
import {PostsInputDto} from "../dto/posts.input-dto";


export const postsRepository = {
    findAll(): Post[] {
        return db.posts
    },

    findById(id: string): Post | null {
        const post = db.posts.find(post => id === post.id);
        if (post) {
            return post
        }
        return null
    },

    createPost(dto: PostsInputDto): Post | null {
        const blog = db.blogs.find(b => b.id === dto.blogId);
        if (blog) {
            const newPost: Post = {
                id: Date.now().toString(),
                title: dto.title,
                shortDescription: dto.shortDescription,
                content: dto.content,
                blogId: dto.blogId,
                blogName: blog.name
            }

            db.posts.push(newPost);
            return newPost
        }
        return null
    },

    updatePost(id: string, dto: PostsInputDto): boolean {
        const blog = db.blogs.find(b => b.id === dto.blogId);
        if (blog) {
            const indexPost = db.posts.findIndex(post => id === post.id);
            if (indexPost !== -1) {
                db.posts[indexPost].title = dto.title;
                db.posts[indexPost].shortDescription = dto.shortDescription;
                db.posts[indexPost].content = dto.content;
                db.posts[indexPost].blogId = dto.blogId;
                db.posts[indexPost].blogName = blog.name;
                return true;
            }
        }
        return false;
    },

    deletePost(id:string):boolean {
        const indexPost = db.posts.findIndex(post => id === post.id);
        if (indexPost !== -1) {
            db.posts.splice(indexPost, 1);
           return true
        }
        return false;
    }
}