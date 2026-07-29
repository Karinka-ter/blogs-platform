import {Blog, BlogInputDto} from "../types/blogs-type";
import {blogsCollection} from "../../db/collections";
import {ObjectId} from "mongodb";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found.errors";


export const blogsRepository = {
    async createBlog(newBlog: Blog): Promise<string> {
        const insertResult = await blogsCollection.insertOne(newBlog);
        return insertResult.insertedId.toString();
    },
    async updateBlog(id: string, blog: BlogInputDto,): Promise<void> {
        const updateResult = await blogsCollection.updateOne(
            {_id: new ObjectId(id)},
            {
                $set: blog,
            }
        );
        if(updateResult.matchedCount === 0){
            throw new RepositoryNotFoundError('No blog found with this ID');
        }

    },
    async deleteBlog(id: string): Promise<void> {
        const deleteResult = await blogsCollection.deleteOne({_id: new ObjectId(id)});
        if(deleteResult.deletedCount === 0){
            throw new RepositoryNotFoundError('No blog found with this ID');
        }
    }
}