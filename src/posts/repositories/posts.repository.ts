import {db} from "../../db/in-memory.db";
import {Post} from "../types/posts-type";
import {PostsInputDto} from "../dto/posts.input-dto";
import {blogsCollection, postsCollection} from "../../db/collections";
import {ObjectId, WithId} from "mongodb";


export const postsRepository = {
   async findAll(): Promise<WithId<Post>[]> {
        return postsCollection.find().toArray();
    },

   async findById(id: string): Promise<WithId<Post> | null> {
       return await postsCollection.findOne({_id: new ObjectId(id)})
    },

   async createPost(post: Post): Promise<WithId<Post> | null> {
       const blog = await blogsCollection.findOne({_id: new ObjectId(post.blogId)});
        if (blog) {
            const insertResult = await postsCollection.insertOne(post)
            return {...post,blogName: blog.name, _id: insertResult.insertedId}
        }
        return null
    },

   async updatePost(id: string, post: Post): Promise<boolean> {
        const blog = await blogsCollection.findOne({_id: new ObjectId(post.blogId)});
        if (blog) {
            const insertResult = await postsCollection.updateOne({_id: new ObjectId(id)}, post)
            return insertResult.matchedCount > 0
        }
        return false
    },

   async deletePost(id: string): Promise<boolean> {
       const deleteResult = await postsCollection.deleteOne({_id: new ObjectId(id)});
       return deleteResult.deletedCount > 0;
    }
}