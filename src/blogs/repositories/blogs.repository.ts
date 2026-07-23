import {Blog} from "../types/blogs-type";
import {blogsCollection} from "../../db/collections";
import {ObjectId, WithId} from "mongodb";

export const blogsRepository = {
    async findAll(): Promise<WithId<Blog>[]> {
        return blogsCollection.find().toArray();
    },
    async findById(id: string): Promise<WithId<Blog> | null> {
        return blogsCollection.findOne({_id: new ObjectId(id)});
    },

    async createBlog(newBlog: Blog): Promise<WithId<Blog>> {
        const insertResult = await blogsCollection.insertOne(newBlog);
        return {...newBlog, _id: insertResult.insertedId};
    },

    async updateBlog(id: string, blog: Blog,): Promise<boolean> {
        const updateResult = await blogsCollection.updateOne(
            { _id: new ObjectId(id) },
             blog
        );

        return updateResult.matchedCount > 0;
    },


   async deleteBlog(id: string):Promise<boolean> {
    const deleteResult = await blogsCollection.deleteOne({_id: new ObjectId(id)});
     return deleteResult.deletedCount > 0;
    }
}