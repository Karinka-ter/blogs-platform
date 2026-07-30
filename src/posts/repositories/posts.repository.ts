import {Post, PostInputDto} from "../types/posts-type";
import {postsCollection} from "../../db/collections";
import {ObjectId} from "mongodb";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found.errors";


export const postsRepository = {
    async createPost(post: Post): Promise<string> {
        const insertResult = await postsCollection.insertOne(post)
        return insertResult.insertedId.toString()
    },
    async updatePostsBlogName(id: string, name: string): Promise<void> {
        await postsCollection.updateMany({blogId: id}, {$set: {blogName: name}})
    },
    async updatePost(id: string, post: PostInputDto): Promise<void> {
       const result =  await postsCollection.updateOne({_id: new ObjectId(id)}, {
                $set: post,
            })
        if(result.matchedCount === 0){
            throw new RepositoryNotFoundError('update Not Found for post')
        }

    },
    async deletePost(id: string): Promise<void> {
        const deleteResult = await postsCollection.deleteOne({_id: new ObjectId(id)});
        if(deleteResult.deletedCount === 0){
            throw new RepositoryNotFoundError('delete Not Found for post')
        }
    }
}